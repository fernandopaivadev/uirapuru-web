import React, { useState, useEffect } from 'react'

import NavBar from '../blocks/NavBar'
import Menu from '../blocks/Menu/Menu'
import Modal from '../blocks/Modal/Modal'
import UserForm from '../forms/UserForm'
import ConsumerUnitForm from '../forms/ConsumerUnitForm'
import DevicesList from '../forms/DevicesList'

import storage from '../../services/storage'
import api from '../../services/api'
import { setFormsValidation } from '../../services/forms'

import styles from '../../styles/profile'
import util from '../../styles/util'

const Profile = ({ history }) => {
    const [user, setUser] = useState({})
    const [isAdmin, setIsAdmin] = useState(false)
    const [consumerUnitIndex, setConsumerUnitIndex] = useState()
    const [modal, setModal] = useState(false)

    useEffect(() => {
        (async () => {
            const _user = await storage.read('user')
            setUser(_user)
            setIsAdmin(await storage.read('access-level') === 'admin')
            setConsumerUnitIndex(
                _user.consumerUnits.length === 1 ? 0 : undefined
            )
        })()
    }, [])

    useEffect(() => {
        setFormsValidation()
    }, [consumerUnitIndex])

    const deleteUser = async () => {
        const result = await api.deleteUser(user._id)

        if (result === 'OK') {
            const result = await api.getUserData()

            if (result === 'OK') {
                history.push('/users-list')
            } else {
                storage.clear('all')
            }
        } else {
            storage.clear('all')
            history.push('/login')
        }
    }

    return user?.consumerUnits ?
        <>
            <NavBar />

            {modal ?
                <Modal
                    message={'Você tem certeza?'}
                    taskOnYes={() => {
                        deleteUser()
                    }}
                    taskOnNo={() => {
                        setModal(false)
                    }}
                />
                : null
            }

            <styles.main>
                <Menu
                    title='Unidades'
                    items={user.consumerUnits}
                    setItemIndex={setConsumerUnitIndex}
                />

                <UserForm />

                {consumerUnitIndex >= 0 ?
                    <ConsumerUnitForm
                        consumerUnitIndex={consumerUnitIndex}
                    />
                    :
                    <styles.empty>
                        <p>
                                Escolha uma unidade Consumidora
                        </p>

                        {isAdmin ?
                            <util.classicButton
                                id='newUnit'
                                onClick={() => {
                                    history.push('/new-unit')
                                }}
                            >
                                    Nova Unidade
                            </util.classicButton>
                            : null
                        }
                    </styles.empty>
                }

                {consumerUnitIndex >= 0 ?
                    <DevicesList
                        consumerUnitIndex={consumerUnitIndex}
                    />
                    :
                    <styles.empty>
                        <p>
                                Sem dispositivos
                        </p>
                    </styles.empty>
                }
            </styles.main>

            <styles.navButtons>
                <util.classicButton
                    id='dashboard'
                    onClick={() =>{
                        history.push('/dashboard')
                    }}
                >
                        Dashboard
                </util.classicButton>

                {isAdmin ?
                    <util.criticalButton
                        id='deleteUser'
                        onClick={() => {
                            setModal(true)
                        }}
                    >
                            Excluir Usuário
                    </util.criticalButton>
                    : null
                }
            </styles.navButtons>
        </>
        : null
}

export default Profile
