import React, { useState, useEffect } from 'react'

import NavBar from '../../blocks/NavBar/NavBar'
import ConsumerUnitForm from '../../forms/ConsumerUnitForm/ConsumerUnitForm'

import storage from '../../../services/storage'

import styles from './NewUnit.style'
import { themes } from '../../../util/themes.style'

const NewUnit = () => {
    const [user, setUser] = useState()
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

        <styles.main>
            <styles.div>
                <ConsumerUnitForm
                    user={user}
                    isAdmin={isAdmin}
                />
            </styles.div>
        </styles.main>
    </>
}

export default NewUnit
