import React, { useState, useEffect } from 'react'

import NavBar from '../../blocks/NavBar/NavBar'
import Menu from '../../blocks/Menu/Menu'
import Modal from '../../blocks/Modal/Modal'
import UserForm from '../../forms/UserForm/UserForm'
import ConsumerUnitForm from '../../forms/ConsumerUnitForm/ConsumerUnitForm'
import DevicesList from '../../forms/DevicesList/DevicesList'

import storage from '../../../services/storage'
import api from '../../../services/api'
import { setFormsValidation } from '../../../services/forms'

import styles from './Profile.style'
import util from '../../../util/util.style'
import { themes } from '../../../util/themes.style'

const Profile = ({ history }) => {
    const [user, setUser] = useState()
    const [isAdmin, setIsAdmin] = useState()
    const [consumerUnitIndex, setConsumerUnitIndex] = useState()
    const [modal, setModal] = useState(false)
    const [username, setUsername] = useState()
    const [theme, setTheme] = useState()
    const [isDarkMode, setIsDarkMode] = useState()

    useEffect(() => {
        (async () => {
            const _user = await storage.read('user')
            setUser(_user)
            setIsAdmin(await storage.read('access-level') === 'admin')
            setUsername(await storage.read('username'))
            setTheme(themes[await storage.read('theme') ?? 'default'])
            setIsDarkMode(await storage.read('theme') === 'dark')
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

    return user ?
        <>
            <NavBar
                user={user}
                username={username}
                isAdmin={isAdmin}
                theme={theme}
                isDarkMode={isDarkMode}
            />

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

                <UserForm
                    user={user}
                    isAdmin={isAdmin}
                />

                {consumerUnitIndex >= 0 ?
                    <ConsumerUnitForm
                        user={user}
                        isAdmin={isAdmin}
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
                        user={user}
                        isAdmin={isAdmin}
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
