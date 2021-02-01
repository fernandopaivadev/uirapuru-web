import React, { useState, useEffect } from 'react'
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
    const [user, setUser] = useState({})
    const [username, setUserName] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => {
        (async () => {
            setUser(await storage.read('user'))
            setUserName(await storage.read('username'))
            setIsAdmin(await storage.read('access-level') === 'admin')
            setDarkMode(await storage.read('theme') === 'dark')
        })()
    }, [])

    const toggleDarkMode = async () => {
        if (darkMode) {
            await applyTheme('default')
            setDarkMode(false)
        } else {
            await applyTheme('dark')
            setDarkMode(true)
        }
    }

    return <styles.main>
        <styles.logo
            id='logo'
            key='logo'
            aria-label={version}
            onClick={() => {
                if (isAdmin) {
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
                onClick={async () => {
                    await toggleDarkMode()
                }}
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
                {isAdmin
                &&
                !(username === user.username)
                    ?
                        `${username} | `
                    : null
                }
                {user?.username ?? ''}
            </styles.username>

            {user ?
                <styles.avatar
                    id='avatar'
                    aria-label='Menu'
                >
                    {user?.username?.split('')[0].toUpperCase()}
                </styles.avatar>
                : null
            }

            <styles.profileMenu
                id='profileMenu'
            >
                <styles.userInfo>
                    <styles.profileAvatar>
                        { user?.username?.split('')[0].toUpperCase()}
                    </styles.profileAvatar>

                    <styles.textInfo>
                        <p className='username'>
                            {user?.username || 'Administrador'}
                        </p>
                        <p className='email'>{user?.email}</p>
                    </styles.textInfo>
                </styles.userInfo>

                {isAdmin ?
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

                {user ?
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

                {user ?
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
                    onClick={async () => {
                        await storage.clear('all')
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
