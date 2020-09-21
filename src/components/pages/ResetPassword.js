import React, { useState, useEffect } from 'react'

import { isAuthenticated } from '../../services/auth'
import { api } from '../../services/api'
import logo from '../../assets/logo.svg'

import '../../styles/login.css'
import '../../styles/util.css'

const Login = ({ history, match }) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [password, setPassword] = useState('')
    const [passwordChanged, setPasswordChanged] = useState(false)

    useEffect(() => {
        if (isAuthenticated()) {
            history.push('/consumer-units')
        }
    }, [history])

    const handleSubmit = async event => {
        try {
            event.preventDefault()
            setLoading(true)

            const token = match.params.token

            const response = await api.patch('/user/reset-password', {
                token,
                password
            })

            const status = response?.status

            if (status === 200) {
                setLoading(false)
                setPasswordChanged(true)
            }
        } catch (err) {
            console.log(err.response.data.message)

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

    return (
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <div className='logo'>
                    <img
                        src={logo}
                        alt='Tech Amazon Logo'
                    />
                    <h1>Uirapuru</h1>
                </div>

                {passwordChanged ?
                    <h1 className='message'>
                        Senha alterada com sucesso
                    </h1>
                    :
                    <>
                        <h1 className='label'>
                            Digite a nova senha
                        </h1>
                        <input
                            required
                            type='password'
                            onChange={event => {
                                setPassword(event.target.value)
                            }}
                        />
                    </>
                }

                {loading ?
                    <div className='loading-container'>
                        <progress className='circular-progress'/>
                    </div>
                    : passwordChanged ?
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
                            SALVAR
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
    )
}

export default Login
