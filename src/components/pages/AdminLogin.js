import React, { useState, useEffect, memo} from 'react'

import { adminLogin, isAuthenticated } from '../../services/auth'
import { api } from '../../services/api'
import fetch from '../../services/fetch'

import logo from '../../assets/logo.svg'

import '../../styles/login.css'
import '../../styles/util.css'

const Login = ({ history }) => {
    const [level, setLevel] = useState('0')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async event => {
        try {
            event.preventDefault()
            setLoading(true)

            const response = await api.get(
                `/admin/auth?level=${level}&password=${password}`
            )

            const status = response?.status

            if (status === 200) {
                setLoading(false)
                adminLogin(response.data.token)

                if(await fetch()) {
                    history.push('/dashboard')
                }
            }
        } catch (err) {
            console.log(err?.message ?? err?.response?.data?.message)

            const status = err?.response?.status

            if (status === 404) {
                setErrorMessage('Usuário não encontrado')
            } else if (status === 401) {
                setErrorMessage('Senha incorreta')
            } else {
                setErrorMessage('Ocorreu um erro')
            }

            setLoading(false)
            setError(true)
        }
    }

    useEffect(() => {
        if (isAuthenticated()) {
            history.push('/admin/users-list')
        }
    }, [history])


    return <div className='login'>
        <form onSubmit={handleSubmit}>
            <div className='logo'>
                <img
                    src={logo}
                    alt='Tech Amazon Logo'
                />
                <h1>Uirapuru</h1>
            </div>

            <label htmlFor='email'>
                Nível de acesso
            </label>
            <input
                required
                onChange={event => {
                    setLevel(event.target.value)
                }}
            />

            <label htmlFor='password'>
                Senha
            </label>
            <input
                type='password'
                required
                onChange={event => {
                    setPassword(event.target.value)
                }}
            />

            {loading ?
                <div className='loading-container'>
                    <progress className='pure-material-progress-circular'/>
                </div>
                :
                <button type='submit'>
                    ENTRAR
                </button>
            }

            {error ?
                <h1 className='message'>
                    {errorMessage}
                </h1>
                :null
            }
        </form>
    </div>
}

export default memo(Login)
