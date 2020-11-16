import React from 'react'
import { render } from 'react-dom'
import { register } from './serviceWorkerRegistration'
import App from './App'

render(<App />, document.getElementById('root'))

register()
