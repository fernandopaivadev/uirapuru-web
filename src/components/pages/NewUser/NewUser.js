import React, { useEffect, useState } from 'react'

import NavBar from '../../blocks/NavBar/NavBar'
import UserForm from '../../forms/UserForm/UserForm'


import storage from '../../../services/storage'

import styles from './NewUser.style'
import util from '../../../util/util.style'
import { themes } from '../../../util/themes.style'

const NewUser = ({ history }) => {
    const [user, setUser] = useState()
    const [userType, setUserType] = useState()
    const [username, setUsername] = useState()
    const [isAdmin, setIsAdmin] = useState(false)
    const [theme, setTheme] = useState()
    const [isDarkMode, setIsDarkMode] = useState()

    useEffect(() => {
        (async () => {
            setUser(await storage.read('user'))
            setUsername(await storage.read('username'))
            setIsAdmin(await storage.read('access-level') === 'admin')
            setTheme(themes[await storage.read('theme') ?? 'default'])
            setIsDarkMode(await storage.read('theme') === 'dark')
        })()
    }, [])

    return <>
        <NavBar
            user={user}
            username={username}
            isAdmin={isAdmin}
            theme={theme}
            isDarkMode={isDarkMode}
        />

        {userType ?
            <styles.main>
                <styles.div>
                    <UserForm
                        isAdmin={isAdmin}
                        userType={userType}
                        exit={() => {
                            setUserType(undefined)
                        }}
                    />
                </styles.div>
            </styles.main>
            :
            <styles.dialog>
                <util.classicButton
                    data-testid='registerPerson'
                    onClick={() => {
                        setUserType('person')
                    }}
                >
                    Cadastrar Pessoa Física
                </util.classicButton>

                <util.classicButton
                    data-testid='registerCompany'
                    onClick={() => {
                        setUserType('company')
                    }}
                >
                    Cadastrar Pessoa Jurídica
                </util.classicButton>

                <util.classicButton
                    data-testid='backToUsersList'
                    onClick={event => {
                        event.preventDefault()
                        history.push('/users-list')
                    }}
                >
                    Voltar
                </util.classicButton>
            </styles.dialog>
        }
    </>
}

export default NewUser