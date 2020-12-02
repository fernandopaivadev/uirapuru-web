import React, { useState, useEffect } from 'react'

import NavBar from '../blocks/NavBar'

import Menu from '../blocks/Menu'

import Modal from '../blocks/Modal'

import storage from '../../services/storage'

import api from '../../services/api'

import UserForm from '../forms/UserForm'

import ConsumerUnitForm from '../forms/ConsumerUnitForm'

import DevicesList from '../forms/DevicesList'

import {
    setFormValidation
} from '../../services/forms'

import styles from '../../styles/profile'

import util from '../../styles/util'

const Profile = ({ history }) => {
    const [consumerUnitIndex, setConsumerUnitIndex] = useState()
    const [modal, setModal] = useState(false)

    const admin = storage.read('access-level') === 'admin'

    useEffect(() => {
        if (consumerUnitIndex >= 0) {
            const len = storage.read('user')
                .consumerUnits[consumerUnitIndex]
                .devices
                .length + 2

            for (let k = 0; k < len; k++) {
                setFormValidation(k)
            }
        } else {
            setFormValidation()
        }
    }, [consumerUnitIndex])

    const deleteUser = async () => {
        const result = await api.deleteUser(storage.read('user')._id)

        if (result === 'OK') {
            history.push('/users-list')
        } else {
            storage.clear('all')
            history.push('/login')
        }
    }

    return <div className='profile'>
        <NavBar />

        { modal ?
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
                items={storage.read('user').consumerUnits}
                setItemIndex={ setConsumerUnitIndex }
                subItemKey='devices'
            />

            <UserForm />

            {consumerUnitIndex >= 0 ?
                <>
                    <ConsumerUnitForm
                        consumerUnitIndex={consumerUnitIndex}
                    />
                </>
                :
                <styles.empty>
                    <p>
                            Escolha uma unidade Consumidora
                    </p>
                    {admin ?
                        <util.classicButton
                            onClick = { () => {
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
                onClick={() =>{
                    history.push('/dashboard')
                }}
            >
                Dashboard
            </util.classicButton>
            {admin ?
                <util.criticalButton
                    onClick={ () => {
                        setModal(true)
                    }}
                >
                    Excluir Usuário
                </util.criticalButton>
                : null
            }
        </styles.navButtons>
    </div>
}

export default Profile
