import React from 'react'
import { withRouter } from 'react-router-dom'

import {
    getUsersList
} from '../../services/storage'

import fetch from '../../services/fetch'

import {
    RecentActors as UsersIcon
} from '@material-ui/icons'

import '../../styles/userslist.css'

const UsersList = ({ history }) =>
    <div className='userslist'>
        <div className='list'>
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
                                if (await fetch(user._id)) {
                                    history.push('/dashboard')
                                }
                            }}>
                            <UsersIcon className='icon' />

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

export default withRouter(UsersList)