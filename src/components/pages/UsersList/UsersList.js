import React, { useState, useEffect } from 'react'
import storage from '../../../services/storage'

import api from '../../../services/api'
import websocket from '../../../services/websocket'

import styles from './userslist.style'
import util from '../../../util/util.style'

const UsersList = ({ history }) => {
    const [loading, setLoading] = useState(true)
    const [usersList, setUsersList] = useState([])

    useEffect(() => {
        (async () => {
            if (await api.getUsersList() === 'OK') {
                const _usersList = await storage
                    .read('users-list')

                if (_usersList?.length) {
                    _usersList.reverse()
                    setUsersList(_usersList)
                    setLoading(false)
                }
            } else {
                history.push('/dashboard')
            }
        })()
    }, [])

    return <styles.main>
        <styles.container>
            {!loading ?
                <styles.title
                    data-testid='users'
                >
                    Usuários
                </styles.title>
                :
                <styles.title
                    data-testid='searching'
                >
                    Buscando dados
                </styles.title>
            }

            <styles.header>
                {!loading ?
                    <>
                        <util.classicButton
                            data-testid='buttonNewUser'
                            onClick={() => {
                                history.push('/new-user')
                            }}
                        >
                            Novo Usuário
                        </util.classicButton>
                        <util.classicButton
                            id='exit'
                            onClick={async () => {
                                await storage.clear('all')
                                history.push('/login')
                            }}
                        >
                            <p>Sair</p>
                        </util.classicButton>
                    </>
                    : null
                }
            </styles.header>

            {loading ?
                <styles.loading>
                    <util.circularProgress/>
                </styles.loading>
                :
                usersList?.length > 0 ?
                    <ul>
                        {usersList?.map((user, userIndex) =>
                            <styles.item
                                id={`item${userIndex}`}
                                key={user?.username}
                                onClick={async () => {
                                    setLoading(true)
                                    if (await api.getUserData(user._id) === 'OK') {
                                        websocket.disconnect()
                                        history.push('/dashboard')
                                    } else {
                                        if (usersList?._id === user._id) {
                                            history.push('/dashboard')
                                        } else {
                                            setLoading(false)
                                        }
                                    }
                                }}>

                                <styles.avatar>
                                    {user?.username?.split('')[0].toUpperCase()}
                                </styles.avatar>

                                <div>
                                    <styles.username>
                                        {user?.username}
                                    </styles.username>

                                    <styles.email>
                                        {user?.email}
                                    </styles.email>
                                </div>
                            </styles.item>
                        )}
                    </ul>
                    :
                    <styles.empty>
                        <p> Não há usuários cadastrados </p>
                    </styles.empty>
            }
        </styles.container>
    </styles.main>
}

export default UsersList
