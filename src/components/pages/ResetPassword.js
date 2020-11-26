import React, { useState } from 'react'

import api from '../../services/api'
import logo from '../../assets/logo.svg'

import styles from '../../styles/login'
import global from '../../styles/global'

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
        <styles.main>
            <styles.form onSubmit={submit}>
                <styles.logo>
                    <img
                        src={logo}
                        alt='Tech Amazon Logo'
                    />
                    <p>Uirapuru</p>
                </styles.logo>

                {passwordChanged ?
                    <styles.message>
                        Senha alterada com sucesso
                    </styles.message>
                    :
                    <>
                        <styles.label>
                            Digite a nova senha
                        </styles.label>
                        <styles.input
                            required
                            type='password'
                            onChange={event => {
                                setPassword(event.target.value)
                            }}
                        />
                    </>
                }

                {loading ?
                    <styles.loading>
                        <progress className='circular-progress'/>
                    </styles.loading>
                    : passwordChanged ?
                        <global.classicButton
                            className='classic-button'
                            onClick={() => {
                                history.push('/login')
                            }}
                        >
                            FAZER LOGIN
                        </global.classicButton>
                        :
                        <global.classicButton
                            type='submit'
                            className='classic-button'
                        >
                            SALVAR
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
    )
}

export default ResetPassword
