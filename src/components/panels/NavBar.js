import React, { useState, useEffect, memo } from 'react'
import { withRouter } from 'react-router-dom'

import {
    Person as ProfileIcon,
    Room as RoomIcon,
    RecentActors as UsersIcon,
    Dashboard as DashboardIcon,
    ExitToApp as LogoutIcon,
    Add as AddIcon
    //Person as ProfileIcon
} from '@material-ui/icons'

import {
    getUser,
    getConsumerUnit,
    storeConsumerUnit,
    getUsersList,
    storeUser,
    clearData
} from '../../services/storage'

import { isAuthenticated, isAdmin, logout } from '../../services/auth'
import fetch from '../../services/fetch'

import logo from '../../assets/logo.svg'

import '../../styles/navbar.css'

const NavBar = ({ history }) => {
    const [usersPopup, setUsersPopup] = useState(isAdmin() && !getUser())
    const [consumerUnitsPopup, setConsumerUnitsPopup] = useState(
        getUser() && !getConsumerUnit()
    )

    useEffect(() => {
        if (!isAuthenticated()) {
            history.push('/login')
        } else {
            if (!fetch()) {
                history.push('/login')
            }
        }
    }, [history])

    return <ul className='navbar'>
        <li className='logo' key='logo'>
            <img src={logo} alt='Tech Amazon Logo' />
            <h1 className='text'>
                Uirapuru
            </h1>
        </li>

        <li
            key='consumer-unit'
            onClick={() => {
                setConsumerUnitsPopup(true)
            }}>

            {getConsumerUnit() ?
                <h1 className='consumerUnitName'>
                    {getConsumerUnit()?.name}
                </h1>
                :
                <h1 className='consumerUnitName'>
                    Escolha a Unidade Consumidora
                </h1>
            }
        </li>

        <li className='profile' key='profile'>
            <h1 className='username'>
                {isAdmin() ? <i>Admin - </i> : null}
                {getUser()?.username ?? ''}
            </h1>

            <button>
                {getUser() ?
                    getUser()?.person
                        ? getUser()?.person?.name.split('')[0]
                        : getUser()?.company?.tradeName.split('')[0]
                    :
                    'A'
                }
            </button>

            <ul className='menu'>
                <div className='user'>
                    <div className='avatar'>
                        {getUser()?.person
                            ? getUser()?.person?.name.split('')[0]
                            : getUser()?.company?.tradeName.split('')[0]
                            ||
                            'A'
                        }
                    </div>

                    <div className='text'>
                        <h1 className='username'>
                            {getUser()?.username || 'Administrador'}
                        </h1>
                        <h2 className='email'>{getUser()?.email}</h2>
                    </div>
                </div>

                {isAdmin() ?
                    <>
                        <li
                            className='item'
                            onClick={() => {
                                setUsersPopup(true)
                            }}>
                            <UsersIcon className='icon' />
                            Usuários
                        </li>
                        <li
                            className='item'
                            onClick={() => {
                                history.push('/new-user')
                            }}>
                            <AddIcon className='icon' />
                            Cadastrar
                        </li>
                    </>
                    : null
                }

                {getUser() ?
                    <div>
                        {getConsumerUnit() ?
                            <li
                                className='item'
                                onClick={() => {
                                    history.push('/profile')
                                }}>
                                <ProfileIcon className='icon' />
                                Meus dados
                            </li>
                            :
                            null
                        }

                        <li
                            className='item'
                            onClick={() => {
                                setConsumerUnitsPopup(true)
                            }}>
                            <RoomIcon className='icon' />
                                Unidades
                        </li>

                        <li
                            className='item'
                            onClick={() => {
                                history.push('/dashboard')
                            }}>
                            <DashboardIcon className='icon' />
                                Dashboard
                        </li>
                    </div>
                    : null
                }

                {isAdmin() || getUser() ?
                    <li
                        className='item'
                        onClick={() => {
                            logout()
                            history.push('/login')
                        }}>
                        <LogoutIcon className='icon' />
                            Sair
                    </li>
                    : null
                }
            </ul>

            {usersPopup ?
                <div
                    className='container'
                    onClick={() => {
                        setUsersPopup(false)
                    }}>
                    <div className='dialog'>
                        <h1 className='title'>Escolha o Usuário</h1>

                        {getUsersList()?.length <= 0 ?
                            <h1 className='empty'>
                                Não há usuários cadastrados
                            </h1>
                            :
                            <ul>
                                {getUsersList()?.map(user =>
                                    <li
                                        key={user?.username}
                                        className='item'
                                        onClick={() => {
                                            fetch(user._id)
                                            storeUser(user)
                                            clearData('consumerUnit')
                                            document.location.reload(false)
                                        }}>
                                        <div className='avatar'>
                                            <UsersIcon className='icon' />
                                        </div>

                                        <div className='text'>
                                            <h1 className='username'>
                                                {user?.username}
                                            </h1>

                                            <h1 className='email'>
                                                {user?.email}
                                            </h1>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        }
                    </div>
                </div>
                : null
            }

            {getUser() && consumerUnitsPopup ?
                <div
                    className='container'
                    onClick={() => {
                        setConsumerUnitsPopup(false)
                    }}
                >
                    <div className='dialog'>
                        <h1 className='title'>
                            Escolha a Unidade Consumidora
                        </h1>

                        {getUser()?.consumerUnits?.length <= 0 ?
                            <h1 className='empty'>
                                Não há unidades consumidoras cadastradas
                            </h1>
                            :
                            <ul>
                                {getUser()?.consumerUnits?.map(consumerUnit =>
                                    <li
                                        key={consumerUnit.number}
                                        className='item'
                                        onClick={() => {
                                            storeConsumerUnit(consumerUnit)
                                            document.location.reload(false)
                                        }}>

                                        <div className='avatar'>
                                            <RoomIcon className='icon' />
                                        </div>

                                        <div className='text'>
                                            <h1 className='name'>
                                                {consumerUnit?.name}
                                            </h1>

                                            <h1 className='number'>
                                                UC: {consumerUnit?.number}
                                            </h1>

                                            <h1 className='address'>
                                                {consumerUnit?.address}
                                            </h1>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        }
                    </div>
                </div>
                : null
            }
        </li>
    </ul>
}

export default withRouter(memo(NavBar))
