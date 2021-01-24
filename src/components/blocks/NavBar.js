import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import {
    MdRecentActors as UsersIcon,
    MdExitToApp as LogoutIcon,
    MdPerson as ProfileIcon,
    MdDashboard as DashboardIcon
} from 'react-icons/md'

import {
    FaMoon as DarkModeIcon
} from 'react-icons/fa'

import {
    BsToggleOn as ToggleOnIcon,
    BsToggleOff as ToggleOffIcon
} from 'react-icons/bs'

import storage from '../../services/storage'

import { applyTheme } from '../../styles/themes'
import styles from '../../styles/navbar'

import logo from '../../assets/logo.svg'
import { version } from '../../../package.json'

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
            id='logo'
            key='logo'
            aria-label={version}
            onClick={() => {
                if (storage.read('access-level') === 'admin') {
                    history.push('/users-list')
                } else {
                    history.push('/dashboard')
                }
            }}
        >
            <img src={logo} alt='tech amazon logo'/>

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
                <DarkModeIcon
                    className='icon'
                />

                {darkMode ?
                    <ToggleOnIcon
                        className='toggle-icon'
                    />
                    :
                    <ToggleOffIcon
                        className='toggle-icon'
                    />
                }
            </styles.toggle>
            <styles.username>
                {storage.read('access-level') === 'admin'
                &&
                !(storage.read('username') === storage.read('user').username)
                    ?
                        `${storage.read('username')} | `
                    : null
                }
                {storage.read('user')?.username ?? ''}
            </styles.username>

            {storage.read('user') ?
                <styles.avatar
                    id='avatar'
                    aria-label='Menu'
                >
                    { storage.read('user')?.username?.split('')[0].toUpperCase()}
                </styles.avatar>
                : null
            }

            <styles.profileMenu
                id='profileMenu'
            >
                <styles.userInfo>
                    <styles.profileAvatar>
                        { storage.read('user')?.username?.split('')[0].toUpperCase()}
                    </styles.profileAvatar>

                    <styles.textInfo>
                        <p className='username'>
                            {storage.read('user')?.username || 'Administrador'}
                        </p>
                        <p className='email'>{storage.read('user')?.email}</p>
                    </styles.textInfo>
                </styles.userInfo>

                {storage.read('access-level') === 'admin' ?
                    <>
                        <styles.item
                            id='usersListLink'
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
                        id='dashboardLink'
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
                        id='profileLink'
                        onClick={() => {
                            history.push('/profile')
                        }}>
                        <ProfileIcon className='icon' />
                        Perfil
                    </styles.item>
                    : null
                }

                <styles.item
                    id='exitLink'
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
