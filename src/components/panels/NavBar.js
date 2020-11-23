import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import {
    MdRecentActors as UsersIcon,
    MdExitToApp as LogoutIcon,
    MdPerson as ProfileIcon,
    MdDashboard as DashboardIcon,
    MdBrightness7 as DarkModeEnabledIcon,
    MdBrightness2 as DarkModeDisabledIcon
} from 'react-icons/md'

import logo from '../../assets/logo.svg'

import storage from '../../services/storage'

import { applyTheme } from '../../themes'

import '../../styles/navbar.css'

const NavBar = ({ history }) => {
    const [darkMode, setDarkMode] = useState(
        storage.read('theme') === 'dark'
    )

    const toggleDarkMode = () => {
        if (storage.read('theme') === 'dark') {
            applyTheme('default')
            setDarkMode(false)
        } else {
            applyTheme('dark')
            setDarkMode(true)
        }
    }

    return <ul className='navbar'>
        <li
            className='logo'
            key='logo'
            onClick={() => {
                history.push('/login')
            }}
        >
            <img src={ logo } alt='tech amazon logo'/>

            <h1 className='text'>
                Uirapuru
            </h1>
        </li>

        <li className='navigation' key='navigation'>
            <div
                className='toggle'
                onClick={toggleDarkMode}
            >
                {darkMode ?
                    <>
                        <p className='text'>
                            Tema Claro
                        </p>
                        <DarkModeEnabledIcon
                            className='icon'
                        />
                    </>
                    :
                    <>
                        <p className='text'>
                            Tema Escuro
                        </p>
                        <DarkModeDisabledIcon
                            className='icon'
                        />
                    </>
                }
            </div>
            <h1 className='username'>
                {storage.read('access-level') === 'admin' ? '[Administrador] ': null}
                {storage.read('user')?.username ?? ''}
            </h1>

            {storage.read('user') ?
                <button>
                    { storage.read('user')?.username?.split('')[0] }
                </button>
                : null
            }

            <ul className='profile-menu'>
                <div className='user'>
                    <div className='avatar'>
                        {storage.read('user')?.person
                            ? storage.read('user')?.person?.name.split('')[0]
                            : storage.read('user')?.company?.tradeName.split('')[0]
                            ||
                            'A'
                        }
                    </div>

                    <div className='text'>
                        <h1 className='username'>
                            {storage.read('user')?.username || 'Administrador'}
                        </h1>
                        <h2 className='email'>{storage.read('user')?.email}</h2>
                    </div>
                </div>

                {storage.read('access-level') === 'admin' ?
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

                {storage.read('user') ?
                    <li
                        className='item'
                        onClick={() => {
                            history.push('/dashboard')
                        }}>
                        <DashboardIcon className='icon' />
                        Dashboard
                    </li>
                    : null
                }

                {storage.read('user') ?
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
                        storage.clear('all')
                        history.push('/login')
                        window.location.reload()
                    }}>
                    <LogoutIcon className='icon' />
                    Sair
                </li>
            </ul>
        </li>
    </ul>
}

export default withRouter(NavBar)
