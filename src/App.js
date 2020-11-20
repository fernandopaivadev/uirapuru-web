import React from 'react'
import Routes from './routes'
import { getData } from './services/storage'
import { applyTheme } from './themes'

import './App.css'

window.onload = () => {
    const theme = getData('theme')

    if (theme) {
        applyTheme(theme)
    } else {
        applyTheme('default')
    }
}

const App = () => <Routes />

export default App
