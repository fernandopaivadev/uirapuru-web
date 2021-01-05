import React, { useState, useEffect } from 'react'

import storage from '../../services/storage'

import api from '../../services/api'

import styles from '../../styles/userslist'
import util from '../../styles/util'

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
                            id='buttonExit'
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
            {storage.read('users-list')?.length <= 0 ?
                <styles.empty>
                    Não há usuários cadastrados
                </styles.empty>
                :
                !loading ?
                    <ul>
                        {storage.read('users-list')?.map((user, userIndex) =>
                            <styles.item
                                id={`item${userIndex}`}
                                key={user?.username}
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

                                <styles.avatar>
                                    { user?.username?.split('')[0].toUpperCase() }
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
