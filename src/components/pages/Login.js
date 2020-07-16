import React, { useState, useEffect, memo } from 'react'

import { login, isAuthenticated } from '../../services/auth'
import { api } from '../../services/api'
import fetch from '../../services/fetch'

import logo from '../../assets/logo.svg'

import '../../styles/login.css'
import '../../styles/util.css'


const Login = ({ history }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (isAuthenticated()) {
            history.push('/dashboard')
        }
        // eslint-disable-next-line
    }, [])

    const handleSubmit = async event => {
        try {
            event.preventDefault()
            setLoading(true)

            const response = await api.get(
                `/user/auth?username=${username}&password=${password}`
            )

            const status = response?.status

            if (status === 200) {
                setLoading(false)
                login(response?.data?.token)

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

    return <div className='login'>
        <form onSubmit={handleSubmit}>
            <div className='logo'>
                <img
                    src={logo}
                    alt='Tech Amazon Logo'
                />
                <h1>Uirapuru</h1>
            </div>

            <h1 className='label'>
                E-mail ou nome de usuário
            </h1>
            <input
                required
                onChange={event => {
                    setUsername(event.target.value)
                }}
            />

            <h1 className='label'>
                Senha
            </h1>
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

            {loading ? null :
                <>
                    <a
                        href='/#/forgot-password'
                        className='link'
                        onClick={() => {
                            history.push('/forgot-password')
                        }}>
                            Esqueci minha senha
                    </a>
                    <a
                        href='/#/admin/login'
                        className='link'
                        onClick={() => {
                            history.push('/admin/login')
                        }}>
                            Sou administrador
                    </a>
                </>
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
