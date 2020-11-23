import React from 'react'
import Routes from './routes'
import storage from './services/storage'
import { applyTheme } from './themes'

import './App.css'

window.onload = () => {
    const theme = storage.read('theme')

    if (theme) {
        applyTheme(theme)
    } else {
        applyTheme('default')
    }
}

const App = () => <Routes />

export default App
