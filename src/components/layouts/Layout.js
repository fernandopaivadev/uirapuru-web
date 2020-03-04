import React, { useState, useEffect, memo } from 'react'
import { withRouter } from 'react-router-dom'

import {
    Avatar,
    Dialog,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar
} from '@material-ui/core'

import {
    Room as RoomIcon,
    Face as FaceIcon,
    Dashboard as DashboardIcon,
    ExitToApp as LogoutIcon,
    Person as ProfileIcon
} from '@material-ui/icons'

import {
    storeUser,
    getUser,
    getConsumerUnit,
    storeConsumerUnit,
    getUsersList
} from '../../services/storage'

import { isAuthenticated, isAdmin, logout } from '../../services/auth'
import logo from '../../assets/logo.svg'

import '../../styles/layout.css'

const Layout = ({ history }) => {
    const [usersPopup, setUsersPopup] = useState(isAdmin() && !getUser())
    const [consumerUnitsPopup, setConsumerUnitsPopup] = useState(
        getUser() && !getConsumerUnit()
    )

    useEffect(() => {
        if (!isAuthenticated()) {
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])

    return <ul className='navbar'>
        <li className='logo' key='logo'>
            <img src={logo} alt='Tech Amazon Logo'/>
            <h1 className='text'>
                    Uirapuru
                {isAdmin() ? ' [Admin]' : null}
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
                : null
            }
        </li>

        <li className='profile' key='profile'>
            <h1 className='username'>{getUser()?.username ?? ''}</h1>

            <button>
                {getUser()?.person
                    ? getUser()?.person?.name.split('')[0]
                    : getUser()?.company?.tradeName.split('')[0]
                }
            </button>

            <ul className='menu'>
                <div className='user'>
                    <Avatar className='avatar'>
                        {getUser()?.person
                            ? getUser()?.person?.name.split('')[0]
                            : getUser()?.company?.tradeName.split('')[0]
                        }
                    </Avatar>

                    <div className='text'>
                        <h1 className='username'>
                            {getUser()?.username || 'Administrador'
                            }
                        </h1>
                        <h2 className='email'>{getUser()?.email}</h2>
                    </div>
                </div>

                {isAdmin() ?
                    <li
                        className='item'
                        onClick={() => {
                            setUsersPopup(true)
                        }}>
                        <FaceIcon className='icon' />
                            Usuários
                    </li>
                    : null
                }

                {getUser() ?
                    <div>
                        <li
                            className='item'
                            onClick={() => {
                                history.push('/profile')
                            }}>
                            <ProfileIcon className='icon' />
                                Meus dados
                        </li>

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

            <Dialog
                open={usersPopup}
                onClose={() => {
                    setUsersPopup(false)
                }}
                scroll='body'>
                <h1 className='dialog-title'>Escolha o Usuário</h1>

                {getUsersList()?.length <= 0 ?
                    <h1 className='empty'>
                        Não há usuários cadastrados
                    </h1>
                    :
                    <List>
                        {getUsersList()?.map(user =>
                            <ListItem
                                key='User'
                                button
                                className='dialog-item'
                                onClick={() => {
                                    storeUser(user)
                                    window.location.reload(false)
                                }}>
                                <ListItemAvatar>
                                    <Avatar className='avatar'>
                                        <FaceIcon className='icon'/>
                                    </Avatar>
                                </ListItemAvatar>

                                <ListItemText>
                                    <h1 className='username'>
                                        {user?.username}
                                    </h1>

                                    <h1 className='email'>
                                        {user?.email}
                                    </h1>
                                </ListItemText>
                            </ListItem>
                        )}
                    </List>
                }
            </Dialog>

            <Dialog
                open={consumerUnitsPopup}
                onClose={() => {
                    setConsumerUnitsPopup(false)
                }}
                scroll='body'>
                <h1 className='dialog-title'>
                    Escolha a Unidade Consumidora
                </h1>

                {getUser()?.consumerUnits?.length <= 0 ?
                    <h1 className='empty'>
                        Não há unidades consumidoras cadastradas
                    </h1>
                    :
                    <List>
                        {getUser()?.consumerUnits?.map(consumerUnit =>
                            <ListItem
                                button
                                className='dialog-item'
                                onClick={() => {
                                    storeConsumerUnit(consumerUnit)
                                    document.location.reload(true)
                                }}
                                key={consumerUnit?.number}>
                                <ListItemAvatar>
                                    <Avatar className='avatar'>
                                        <RoomIcon className='icon'/>
                                    </Avatar>
                                </ListItemAvatar>

                                <ListItemText>
                                    <h1 className='name'>
                                        {consumerUnit?.name}
                                    </h1>

                                    <h1 className='number'>
                                        UC: {consumerUnit?.number}
                                    </h1>

                                    <h1 className='address'>
                                        {consumerUnit?.address}
                                    </h1>
                                </ListItemText>
                            </ListItem>
                        )}
                    </List>
                }
            </Dialog>
        </li>
    </ul>
}

export default withRouter(memo(Layout))
