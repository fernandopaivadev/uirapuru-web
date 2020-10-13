import React from 'react'
import { withRouter } from 'react-router-dom'

import {
    RecentActors as UsersIcon,
    ExitToApp as LogoutIcon,
    Person as ProfileIcon
} from '@material-ui/icons'

import logo from '../../assets/logo.svg'

import { getData } from '../../services/storage'

import { isAuthenticated, isAdmin, logout } from '../../services/auth'

import '../../styles/navbar.css'

const NavBar = ({ history }) => {
    if (!isAuthenticated()) {
        history.push('/login')
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
            <h1 className='username'>
                {isAdmin() ? '[Administrador] ': null}
                {getData('user')?.username ?? ''}


            </h1>

            {getData('user') ?
                <button>
                    { getData('user')?.username?.split('')[0] }
                </button>
                : null
            }

            <ul className='profile-menu'>
                <div className='user'>
                    <div className='avatar'>
                        {getData('user')?.person
                            ? getData('user')?.person?.name.split('')[0]
                            : getData('user')?.company?.tradeName.split('')[0]
                            ||
                            'A'
                        }
                    </div>

                    <div className='text'>
                        <h1 className='username'>
                            {getData('user')?.username || 'Administrador'}
                        </h1>
                        <h2 className='email'>{getData('user')?.email}</h2>
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

                {getData('user') ?
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

export default withRouter(NavBar)
