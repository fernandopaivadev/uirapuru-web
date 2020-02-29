import React, { useState, useEffect } from 'react'

import {
    TextField,
    Button,
    Snackbar,
    CircularProgress,
    Typography,
    Paper
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import { isAuthenticated } from '../../services/auth'
import { api } from '../../services/api'
import logo from '../../assets/logo.svg'

import themes from '../../themes'

const useStyles = makeStyles(() => ({
    button: {
        marginTop: '30px',
        fontSize: '16px',
        background: themes.default.green,
        marginLeft: '10px',
        marginRight: '10px',
        cursor: 'pointer',
        color: themes.default.green,
        '&:hover': {
            backgroundColor: themes.default.lightGreen
        }
    },
    textField: {
        width: '250px',
        '& label.Mui-focused': {
            color: themes.default.lightGreen
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: themes.default.green
            },
            '&:hover fieldset': {
                borderColor: themes.default.lightGreen
            },
            '&.Mui-focused fieldset': {
                borderColor: themes.default.lightGreen
            }
        }
    }
}))

const styles = {
    paper: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        background: themes.default.white,
        padding: '30px',
        textAlign: 'center',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        width: '350px'
    },
    logoContainer: {
        display: 'flex',
        fontSize: '35px',
        fontFamily: 'vibrocentric',
        color: themes.default.black,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
    },
    logoImg: {
        width: '60px',
        margin: '0px 10px 0px 0px'
    },
    loadingContainer: {
        marginTop: '30px',
        justifyContent: 'center'
    },
    loading: {
        color: themes.default.green
    },
    buttonText: {
        fontSize: '18px',
        fontWeight: '500'
    },
    linksContainer: {
        fontSize: '16px',
        color: themes.default.gray,
        textAlign: 'center',
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column'
    },
    message: {
        color: themes.default.lightGray,
        fontSize: '32px',
        fontWeight: 'bold',
        textAlign: 'center'
    }
}

const Login = ({ history, match }) => {
    const classes = useStyles()

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

            const { status } = response

            if (status === 200) {
                setLoading(false)
                setPasswordChanged(true)
            }
        } catch (err) {
            console.log(err.response.data.message)

            if (err.response.status === 404) {
                setErrorMessage('Usuário não encontrado')
            }

            if (err.response.status === 400) {
                setErrorMessage('Ocorreu um erro')
            }

            setLoading(false)
            setError(true)
        }
    }

    const goToLogin = () => {
        history.push('/login')
    }

    return (
        <Paper style={styles.paper}>
            <form onSubmit={handleSubmit} className={classes.form}>
                <Typography
                    style={{
                        display: 'flex',
                        fontSize: '35px',
                        fontWeight: '500',
                        fontFamily: 'vibrocentric',
                        color: themes.default.black,
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 'auto'
                    }}>
                    <img
                        src={logo}
                        alt='Tech Amazon Logo'
                        style={{
                            width: '40px',
                            margin: '0px 15px 0px 0px'
                        }}
                    />
                    Uirapuru
                </Typography>

                {passwordChanged ? (
                    <Typography style={styles.message}>
                        Senha alterada com sucesso
                    </Typography>
                ) : (
                    <TextField
                        id='outlined-password-input'
                        label='Digite a nova senha'
                        type='password'
                        required={true}
                        autoComplete='current-password'
                        margin='normal'
                        variant='outlined'
                        className={classes.textField}
                        onChange={event => {
                            setPassword(event.target.value)
                        }}
                    />
                )}

                {loading ? (
                    <div style={styles.loadingContainer}>
                        <CircularProgress style={styles.loading} />
                    </div>
                ) : passwordChanged ? (
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={goToLogin}
                        className={classes.button}>
                        FAZER LOGIN
                    </Button>
                ) : (
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.button}>
                        REDEFINIR SENHA
                    </Button>
                )}

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
