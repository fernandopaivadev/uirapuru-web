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

import styles from '../../styles/navbar'

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

    return <styles.main>
        <styles.logo
            key='logo'
            onClick={() => {
                if (storage.read('access-level') === 'admin') {
                    history.push('/users-list')
                } else {
                    history.push('/dashboard')
                }
            }}
        >
            <img src={ logo } alt='tech amazon logo'/>

            <p>
                Uirapuru
            </p>
        </styles.logo>

        <styles.navigation
            key='navigation'
        >
            <styles.toggle
                onClick={toggleDarkMode}
            >
                {darkMode ?
                    <>
                        <p>
                            Tema Claro
                        </p>
                        <DarkModeEnabledIcon
                            className='icon'
                        />
                    </>
                    :
                    <>
                        <p>
                            Tema Escuro
                        </p>
                        <DarkModeDisabledIcon
                            className='icon'
                        />
                    </>
                }
            </styles.toggle>
            <styles.username>
                {storage.read('access-level') === 'admin' ? 'Administrador | ': null}
                {storage.read('user')?.username ?? ''}
            </styles.username>

            {storage.read('user') ?
                <styles.avatar>
                    { storage.read('user')?.username?.split('')[0] }
                </styles.avatar>
                : null
            }

            <styles.profileMenu>
                <styles.userInfo>
                    <styles.avatar>
                        {storage.read('user')?.person
                            ? storage.read('user')?.person?.name.split('')[0]
                            : storage.read('user')?.company?.tradeName.split('')[0]
                            ||
                            'A'
                        }
                    </styles.avatar>

                    <styles.textInfo>
                        <h1 className='username'>
                            {storage.read('user')?.username || 'Administrador'}
                        </h1>
                        <h2 className='email'>{storage.read('user')?.email}</h2>
                    </styles.textInfo>
                </styles.userInfo>

                {storage.read('access-level') === 'admin' ?
                    <>
                        <styles.item
                            onClick={() => {
                                history.push('/users-list')
                            }}>
                            <UsersIcon className='icon' />
                            Usuários
                        </styles.item>
                    </>
                    : null
                }

                {storage.read('user') ?
                    <styles.item
                        onClick={() => {
                            history.push('/dashboard')
                        }}>
                        <DashboardIcon className='icon' />
                        Dashboard
                    </styles.item>
                    : null
                }

                {storage.read('user') ?
                    <styles.item
                        onClick={() => {
                            history.push('/profile')
                        }}>
                        <ProfileIcon className='icon' />
                        Perfil
                    </styles.item>
                    : null
                }

                <styles.item
                    onClick={() => {
                        storage.clear('all')
                        history.push('/login')
                        window.location.reload()
                    }}>
                    <LogoutIcon className='icon' />
                    Sair
                </styles.item>
            </styles.profileMenu>
        </styles.navigation>
    </styles.main>
}

export default withRouter(NavBar)
