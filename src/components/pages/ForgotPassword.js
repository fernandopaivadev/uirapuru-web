import React, { useState } from 'react'

import api from '../../services/api'
import logo from '../../assets/logo.svg'

import '../../styles/login.css'
import '../../styles/util.css'

const ForgotPassword = ({ history }) => {
    const [username, setUsername] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [emailSent, setEmailSent] = useState(false)

    const submit = async event => {
        event.preventDefault()
        setLoading(true)

        const result = await api.forgotPassword(username)

        if (result === 'OK') {
            setLoading(false)
            setEmailSent(true)
        } else {
            setErrorMessage(result)
            setLoading(false)
            setError(true)
        }
    }

    return <div className='login'>
        <form onSubmit={submit}>
            <div className='logo'>
                <img
                    src={logo}
                    alt='Tech Amazon Logo'
                />
                <h1>Uirapuru</h1>
            </div>

            {emailSent ?
                <p className='message'>
                    Enviamos um link para o seu email
                </p>
                :
                <>
                    <label>
                        E-mail ou nome de usuário
                    </label>
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
                    <button
                        className='classic-button'
                        onClick={() => {
                            history.push('/login')
                        }}
                    >
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
                <p className='message'>
                    {errorMessage}
                </p>
                :null
            }
        </form>
    </div>
}

export default ForgotPassword
