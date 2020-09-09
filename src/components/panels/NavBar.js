import React, { useEffect, memo } from 'react'
import { withRouter } from 'react-router-dom'

import {
    RecentActors as UsersIcon,
    ExitToApp as LogoutIcon,
    Menu as MenuIcon,
    Person as ProfileIcon
} from '@material-ui/icons'

import logo from '../../assets/logo.svg'

import {
    getUser
} from '../../services/storage'

import { isAuthenticated, isAdmin, logout } from '../../services/auth'
import fetch from '../../services/fetch'

import '../../styles/navbar.css'

const NavBar = ({ history }) => {
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
        <li className='menu'>
            <button
                onClick={() => {
                    const deviceMenu = document
                        .querySelector('.devicemenu')

                    if (deviceMenu.style.visibility === 'visible') {
                        deviceMenu.style.visibility = 'hidden'
                        deviceMenu.style.opacity = 0
                    } else {
                        deviceMenu.style.visibility = 'visible'
                        deviceMenu.style.opacity = 1
                    }
                }}
            >
                <MenuIcon className="menu-icon" />
            </button>
        </li>

        <li
            className='logo'
            key='logo'
            onClick={() => {
                history.push('/dashboard')
            }}
        >
            <img src={ logo } alt='tech amazon logo'/>

            <h1 className='text'>
                Uirapuru
            </h1>
        </li>

        <li className='navigation' key='navigation'>
            <h1 className='username'>
                {isAdmin() ? 'Administrador | ': null}
                {getUser()?.username ?? ''}
            </h1>

            <button>
                { getUser()?.username?.split('')[0] }
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
                                history.push('/users-list')
                            }}>
                            <UsersIcon className='icon' />
                                Usuários
                        </li>
                    </>
                    : null
                }

                {getUser() ?
                    <li
                        className='item'
                        onClick={() => {
                            history.push('/profile')
                        }}>
                        <ProfileIcon className='icon' />
                            Perfil
                    </li>
                    : null
                }

                <li
                    className='item'
                    onClick={() => {
                        logout()
                        history.push('/login')
                    }}>
                    <LogoutIcon className='icon' />
                        Sair
                </li>
            </ul>
        </li>
    </ul>
}

export default withRouter(memo(NavBar))
