import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

import { isAuthenticated, logout } from '../../services/auth'

import { getData } from '../../services/storage'

import fetch from '../../services/fetch'

import { Person as UserIcon } from '@material-ui/icons'

import '../../styles/userslist.css'
import '../../styles/util.css'

const UsersList = ({ history }) => {
    const [loading, setLoading] = useState(false)

    if (!isAuthenticated()) {
        history.push('/login')
    }

    return <div className='userslist'>
        <div className='list'>
            <div className='header'>
                <p className='title'>Escolha o Usuário</p>
                <button
                    className='classic-button'
                    onClick={() => {
                        history.push('/new-user')
                    }}
                >
                    Criar Usuário
                </button>
                <button
                    className='classic-button'
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
                !loading ?
                    <ul>
                        {getData('users-list')?.map(user =>
                            <li
                                key={user?.username}
                                className='item'
                                onClick={async () => {
                                    setLoading(true)
                                    if (await fetch(user._id)) {
                                        history.push('/dashboard')
                                    } else {
                                        setLoading(false)
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
                    :
                    <div className='loading-container'>
                        <progress className='circular-progress'/>
                    </div>
            }
        </div>
    </div>
}
export default withRouter(UsersList)