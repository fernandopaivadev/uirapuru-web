import React from 'react'
import { withRouter } from 'react-router-dom'

import { isAuthenticated, logout } from '../../services/auth'

import { getData } from '../../services/storage'

import fetch from '../../services/fetch'

import {
    Person as UserIcon
} from '@material-ui/icons'

import '../../styles/userslist.css'

const UsersList = ({ history }) => {
    if (!isAuthenticated()) {
        history.push('/login')
    }

    return <div className='userslist'>
        <div className='list'>
            <div className='header'>
                <h1 className='title'>Escolha o Usuário</h1>

                <button
                    onClick={() => {
                        logout()
                        history.push('/login')
                    }}
                >
                    Sair
                </button>
            </div>
            {getData('users-list')?.length <= 0 ?
                <h1 className='empty'>
                    Não há usuários cadastrados
                </h1>
                :
                <ul>
                    {getData('users-list')?.map(user =>
                        <li
                            key={user?.username}
                            className='item'
                            onClick={async () => {
                                if (await fetch(user._id)) {
                                    history.push('/dashboard')
                                }
                            }}>
                            <UserIcon className='icon' />

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
}
export default withRouter(UsersList)