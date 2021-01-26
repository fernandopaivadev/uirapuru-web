import React, { useState, useEffect } from 'react'

import storage from '../../services/storage'

import api from '../../services/api'
import websocket from '../../services/websocket'

import styles from '../../styles/userslist'
import util from '../../styles/util'

const UsersList = ({ history }) => {
    websocket.disconnect()

    const [loading, setLoading] = useState(true)
    const usersList = storage.read('users-list')?.reverse()

    useEffect(() => {
        (async () => {
            if (await api.getUsersList() === 'OK') {
                setLoading(false)
            } else {
                history.push('/dashboard')
            }
        })()
    })

    return <styles.main>
        <styles.container>
            {!loading ?
                <styles.title>Usuários</styles.title>
                :
                <styles.title>Buscando dados</styles.title>
            }
            <styles.header>
                {!loading ?
                    <>
                        <util.classicButton
                            id='buttonNewUser'
                            onClick={() => {
                                history.push('/new-user')
                            }}
                        >
                            Novo Usuário
                        </util.classicButton>
                        <util.classicButton
                            id='exit'
                            onClick={() => {
                                storage.clear('all')
                                history.push('/login')
                            }}
                        >
                            Sair
                        </util.classicButton>
                    </>
                    : null
                }
            </styles.header>
            {usersList?.length <= 0 ?
                <styles.empty>
                    Não há usuários cadastrados
                </styles.empty>
                :
                !loading ?
                    <ul>
                        {usersList?.map((user, userIndex) =>
                            <styles.item
                                id={`item${userIndex}`}
                                key={user?.username}
                                onClick={async () => {
                                    setLoading(true)
                                    if (await api.getUserData(user._id) === 'OK') {
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
                    <styles.loading>
                        <util.circularProgress/>
                    </styles.loading>
            }
        </styles.container>
    </styles.main>
}

export default UsersList
