import React from 'react'
import Routes from './routes'
import storage from './services/storage'

import { applyTheme } from './styles/themes'
import GlobalStyle from './styles/global.js'

window.onload = () => {
    const theme = storage.read('theme')

    if (theme) {
        applyTheme(theme)
    } else {
        applyTheme('default')
    }
}

const App = () => <>
    <GlobalStyle/>
    <Routes />
</>

export default App
