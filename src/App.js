import React from 'react'
import Routes from './routes'
import storage from './services/storage'

import { applyTheme } from './styles/themes'
import GlobalStyle from './styles/global.js'

window.onload = async () => {
    const themeName = await storage.read('theme')

    if (themeName) {
        await applyTheme(themeName)
    } else {
        await applyTheme('default')
    }
}

const App = () => <>
    <GlobalStyle/>
    <Routes />
</>

export default App