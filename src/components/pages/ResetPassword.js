import React, { useState, useEffect } from 'react'

import {
    Snackbar,
    CircularProgress,
    Paper
} from '@material-ui/core'

import { isAuthenticated } from '../../services/auth'
import { api } from '../../services/api'
import logo from '../../assets/logo.svg'

import '../../styles/login.css'

const Login = ({ history, match }) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [password, setPassword] = useState('')
    const [passwordChanged, setPasswordChanged] = useState(false)

    useEffect(() => {
        try {
            if (isAuthenticated()) {
                history.push('/consumer-units')
            }
        } catch (err) {
            console.log(err.message)
        }
        // eslint-disable-next-line
    }, [])

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
        <Paper className='login'>
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
                        <CircularProgress className='loading' />
                    </div>
                    : passwordChanged ?
                        <button onClick={() => {
                            history.push('/login')
                        }}>
                            FAZER LOGIN
                        </button>
                        :
                        <button type='submit'>
                            SALVAR
                        </button>
                }

                <Snackbar
                    open={error}
                    onClose={() => {
                        setError(false)
                    }}
                    ContentProps={{
                        'aria-describedby': 'message-id'
                    }}
                    message={
                        <span id='message-id'>
                            {errorMessage}, por favor tente novamente
                        </span>
                    }
                />
            </form>
        </Paper>
    )
}

export default Login
