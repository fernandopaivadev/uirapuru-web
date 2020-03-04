import React, { useState, useEffect } from 'react'

import {
    Snackbar,
    CircularProgress,
    Paper
} from '@material-ui/core'

import { adminLogin, isAuthenticated } from '../../services/auth'
import { api } from '../../services/api'
import logo from '../../assets/logo.svg'

import '../../styles/login.css'

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
                history.push('/fetch')
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
        try {
            if (isAuthenticated()) {
                history.push('/admin/users-list')
            }
        } catch (err) {
            console.log(err.message)
        }
        // eslint-disable-next-line
    }, [])


    return <Paper className='login'>
        <form onSubmit={handleSubmit}>
            <div className='logo'>
                <img
                    src={logo}
                    alt='Tech Amazon Logo'
                />
                <h1>Uirapuru</h1>
            </div>

            <h1 className='label'>
                Nível de acesso
            </h1>
            <input
                required
                onChange={event => {
                    setLevel(event.target.value)
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
                    <CircularProgress className='loading' />
                </div>
                :
                <button type='submit'>
                    ENTRAR
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

/*
    return (
        <Paper className='login'>
            <form onSubmit={handleSubmit}>
                <Typography style={styles.logoContainer}>
                    <img
                        src={logo}
                        alt='Tech Amazon Logo'
                        style={styles.logoImg}
                    />
                    Uirapuru
                </Typography>

                <TextField
                    {...textFieldProps}
                    label='Nível de acesso'
                    onChange={event => {
                        setLevel(event.target.value)
                    }}
                />
                <TextField
                    {...textFieldProps}
                    label='Senha'
                    type='password'
                    onChange={event => {
                        setPassword(event.target.value)
                    }}
                />

                {loading ?
                    <div className={classes.progress}>
                        <CircularProgress className={classes.progressLine} />
                    </div>
                    :
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.button}>
                        <Typography>ENTRAR</Typography>
                    </Button>
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
    )*/
}

export default Login
