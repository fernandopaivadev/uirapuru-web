import React, { useState, useEffect } from 'react'

import storage from '../../services/storage'

import api from '../../services/api'

import '../../styles/userslist.css'
import '../../styles/util.css'

const UsersList = ({ history }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            if (await api.getUsersList() === 'OK') {
                setLoading(false)
            } else {
                history.push('/dashboard')
            }
        })()
    })

    return <div className='userslist'>
        <div className='list'>
            {!loading ?
                <p className='title'>Usuários</p>
                :
                <p className='title'>Buscando dados</p>
            }
            <div className='header'>
                {!loading ?
                    <>
                        <button
                            className='classic-button'
                            onClick={() => {
                                history.push('/new-user')
                            }}
                        >
                            Novo Usuário
                        </button>
                        <button
                            className='classic-button'
                            onClick={() => {
                                storage.clear('all')
                                history.push('/login')
                            }}
                        >
                            Sair
                        </button>
                    </>
                    : null
                }
            </div>
            {storage.read('users-list')?.length <= 0 ?
                <h1 className='empty'>
                    Não há usuários cadastrados
                </h1>
                :
                !loading ?
                    <ul>
                        {storage.read('users-list')?.map(user =>
                            <li
                                key={user?.username}
                                className='item'
                                onClick={async () => {
                                    setLoading(true)
                                    if (await api.getUserData(user._id) === 'OK') {
                                        history.push('/dashboard')
                                    } else {
                                        if (storage.read('user')?._id === user._id) {
                                            history.push('/dashboard')
                                        } else {
                                            setLoading(false)
                                        }
                                    }
                                }}>

                                <button className='icon'>
                                    { user?.username?.split('')[0] }
                                </button>

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

export default UsersList
