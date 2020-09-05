import React, { useState, useEffect, memo } from 'react'
import { withRouter } from 'react-router-dom'

import {
    RecentActors as UsersIcon,
    Dashboard as DashboardIcon,
    ExitToApp as LogoutIcon,
    Menu as MenuIcon
    //Person as ProfileIcon
} from '@material-ui/icons'

import logo from '../../assets/logo.svg'

import {
    getUser,
    getUsersList
} from '../../services/storage'

import { isAuthenticated, isAdmin, logout } from '../../services/auth'
import fetch from '../../services/fetch'

import '../../styles/navbar.css'

let isDashboard = false

window.onload = () => {
    const devicemenu = document.querySelector('.devicemenu')
    devicemenu.style.opacity = '1'
    devicemenu.style.visibility = 'visible'
}

const NavBar = ({ history }) => {
    const [usersPopup, setUsersPopup] = useState(isAdmin() && !getUser())

    useEffect(() => {
        if (!isAuthenticated()) {
            history.push('/login')
        } else {
            if (!fetch()) {
                history.push('/login')
            }
        }

        isDashboard = history.location.pathname === '/dashboard'

        if (isDashboard) {
            document
                .querySelector('.devicemenu')
                .style.visibility = 'hidden'
        }
    }, [history])

    return <ul className='navbar'>
        <li className='menu'>
            <button
                onClick={() => {
                    if (isDashboard) {
                        const deviceMenu = document
                            .querySelector('.devicemenu')

                        if (deviceMenu.style.visibility === 'hidden') {
                            deviceMenu.style.visibility = 'visible'
                            deviceMenu.style.opacity = 1
                        } else {
                            deviceMenu.style.visibility = 'hidden'
                            deviceMenu.style.opacity = 0
                        }
                    }
                }}
            >
                <MenuIcon className="menu-icon" />
            </button>
        </li>

        <li className='logo' key='logo'>

            <img src={ logo } alt='tech amazon logo'/>

            <h1 className='text'>
                Uirapuru
            </h1>
        </li>


        <li className='profile' key='profile'>
            <h1 className='username'>
                {isAdmin() ? <i>Admin - </i> : null}
                {getUser()?.username ?? ''}
            </h1>

            <button>
                {getUser() ?
                    getUser()?.username?.split('')[0]
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
                    </>
                    : null
                }

                {getUser() ?
                    <div>
                        {/* <li
                            className='item'
                            onClick={() => {
                                history.push('/profile')
                            }}>
                            <ProfileIcon className='icon' />
                                Meus dados
                        </li> */}

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
                                        onClick={async () => {
                                            const ok = await fetch(user._id)

                                            if (ok) {
                                                document.location.reload(false)
                                            }
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
        </li>
    </ul>
}

export default withRouter(memo(NavBar))
