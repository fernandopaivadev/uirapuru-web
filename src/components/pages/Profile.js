import React, { useState, useEffect } from 'react'

import NavBar from '../blocks/NavBar'

import Menu from '../blocks/Menu'

import Modal from '../blocks/Modal'

import NewDevice from '../blocks/NewDevice'

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
    const admin = storage.read('access-level') === 'admin'
    const user = storage.read('user')

    const [consumerUnitIndex, setConsumerUnitIndex] = useState()
    const [deviceIndex, setDeviceIndex] = useState()
    const [modal, setModal] = useState([false,false])
    const [success, setSuccess] = useState([false,false])
    const [error, setError] = useState([false,false])
    const [errorMessage, setErrorMessage] = useState(
        'Ocorreu um erro'
    )
    const [newDevicePopup, setNewDevicePopup] = useState(false)

    useEffect(() => {
        if (consumerUnitIndex >= 0) {
            const len = storage.read('user')
                .consumerUnits[consumerUnitIndex]
                .devices
                .length + 2

            setSuccess(
                new Array(len).fill(false)
            )

            setError(
                new Array(len).fill(false)
            )

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

    const submit = async index => {
        const result = await api.updateUser(user)

        if (result === 'OK') {
            const _success = [...success]
            _success[index] = true
            setSuccess(_success)

            const _error = [...error]
            _error[index] = false
            setError(_error)

            setTimeout(() => {
                const _success = [...success]
                _success[index] = false
                setSuccess(_success)
            }, 2000)
        } else {
            setErrorMessage(result)

            const _success = [...success]
            _success[index] = false
            setSuccess(_success)

            const _error = [...error]
            _error[index] = true
            setError(_error)

            setTimeout(() => {
                const _error = [...error]
                _error[index] = false
                setError(_error)
            }, 2000)
        }
    }

    return <div className='profile'>
        <NavBar />

        { newDevicePopup ?
            <NewDevice
                consumerUnitIndex={consumerUnitIndex}
                exit={() => {
                    setNewDevicePopup(false)
                }}
            />
            : null
        }

        { modal[0] ?
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


        { modal[2] ?
            <Modal
                message={'Você tem certeza?'}
                taskOnYes={() => {
                    user
                        .consumerUnits[consumerUnitIndex]
                        .devices.pop(deviceIndex)
                    submit(1)
                    setModal([false, false, false])
                }}
                taskOnNo={() => {
                    setModal([false, false, false])
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

            {success[1] && !error[1]?
                <p className='success'>
                        Salvo com sucesso!
                </p>
                : null
            }
            {!success[1] && error[1]?
                <p className='error'>
                    { errorMessage }
                </p>
                : null
            }

            {consumerUnitIndex >= 0 ?
                <DevicesList
                    user={storage.read('user')}
                    consumerUnitIndex={consumerUnitIndex}
                    isAdmin={admin}
                    setNewDevicePopup={setNewDevicePopup}
                    setDeviceIndex={setDeviceIndex}
                    submit={submit}
                    setModal={setModal}
                    success={success}
                    error={error}
                    errorMessage={errorMessage}
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
                        setModal([true, false, false])
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
