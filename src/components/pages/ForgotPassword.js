import React, { useState } from 'react'

import api from '../../services/api'
import logo from '../../assets/logo.svg'

import styles from '../../styles/login'
import global from '../../styles/global'

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

    return <styles.main>
        <styles.form onSubmit={submit}>
            <styles.logo>
                <img
                    src={logo}
                    alt='Tech Amazon Logo'
                />
                <p>Uirapuru</p>
            </styles.logo>

            {emailSent ?
                <styles.message>
                    Enviamos um link para o seu email
                </styles.message>
                :
                <>
                    <styles.label>
                        E-mail ou nome de usuário
                    </styles.label>
                    <styles.input
                        required
                        onChange={event => {
                            setUsername(event.target.value)
                        }}
                    />
                </>
            }

            {loading ?
                <styles.loading>
                    <progress className='circular-progress'/>
                </styles.loading>
                : emailSent ?
                    <styles.classicButton
                        onClick={() => {
                            history.push('/login')
                        }}
                    >
                        FAZER LOGIN
                    </styles.classicButton>
                    :
                    <global.classicButton
                        type='submit'
                    >
                        ENVIAR LINK
                    </global.classicButton>
            }

            {error ?
                <styles.error>
                    {errorMessage}
                </styles.error>
                :null
            }
        </styles.form>
    </styles.main>
}

export default ForgotPassword
