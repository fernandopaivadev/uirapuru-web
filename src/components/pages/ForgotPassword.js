import React, { useState, useEffect } from 'react'

import { isAuthenticated } from '../../services/auth'
import { api } from '../../services/api'
import logo from '../../assets/logo.svg'

import '../../styles/login.css'
import '../../styles/util.css'

const Login = ({ history }) => {
    const [username, setUsername] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [emailSent, setEmailSent] = useState(false)

    useEffect(() => {
        if (isAuthenticated()) {
            history.push('/consumer-units')
        }
    }, [history])

    const handleSubmit = async event => {
        try {
            event.preventDefault()
            setLoading(true)

            const response = await api.get(
                `/user/forgot-password?username=${username}`
            )

            const status = response?.status

            if (status === 200) {
                setLoading(false)
                setEmailSent(true)
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

            {emailSent ?
                <h1 className='message'>
                    Enviamos um link para o seu email
                </h1>
                :
                <>
                    <h1 className='label'>
                        E-mail ou nome de usuário
                    </h1>
                    <input
                        required
                        onChange={event => {
                            setUsername(event.target.value)
                        }}
                    />
                </>
            }

            {loading ?
                <div className='loading-container'>
                    <progress className='circular-progress'/>
                </div>
                : emailSent ?
                    <button onClick={() => {
                        history.push('/login')
                    }}>
                        FAZER LOGIN
                    </button>
                    :
                    <button
                        type='submit'
                        className='classic-button'
                    >
                        ENVIAR LINK
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

export default Login
