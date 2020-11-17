import React, { useState } from 'react'

import api from '../../services/api'
import logo from '../../assets/logo.svg'

import '../../styles/login.css'
import '../../styles/util.css'

const ResetPassword = ({ history }) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [password, setPassword] = useState('')
    const [passwordChanged, setPasswordChanged] = useState(false)

    const submit = async event => {
        event.preventDefault()
        setLoading(true)

        const token = history
            .location
            .search
            .split('?token=')[1]

        const result = await api.resetPassword(token, password)

        if (result === 'OK') {
            setLoading(false)
            setPasswordChanged(true)
        } else {
            setErrorMessage(result)
            setLoading(false)
            setError(true)
        }
    }

    return (
        <div className='login'>
            <form onSubmit={submit}>
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
                        <label>
                            Digite a nova senha
                        </label>
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

export default ResetPassword
