import React, { useState, useEffect } from 'react'

import {
    TextField,
    Button,
    Snackbar,
    CircularProgress,
    Link,
    Typography,
    Paper
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { login, isAuthenticated } from '../../services/auth'
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
        color: themes.default.white,
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
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: themes.default.black,
        '&:hover': {
            textDecoration: 'none',
            color: themes.default.green
        }
    }
}))

const styles = {
    paper: {
        position: 'absolute',
        display: 'flex',
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
    }
}

const Login = ({ history }) => {
    const classes = useStyles()

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

            const { status } = response

            if (status === 200) {
                setLoading(false)
                login(response.data.token)
                history.push('/loading')
            }
        } catch (err) {
            console.log(err.response.data.message)

            if (err.response.status === 404) {
                setErrorMessage('Usuário não encontrado')
            }

            if (err.response.status === 401) {
                setErrorMessage('Senha incorreta')
            }

            if (err.response.status === 500) {
                setErrorMessage('Ocorreu um erro interno')
            }

            setLoading(false)
            setError(true)
        }
    }

    const textFieldProps = {
        id: 'outlined-name',
        required: true,
        margin: 'normal',
        variant: 'outlined',
        className: classes.textField
    }

    return (
        <Paper style={styles.paper}>
            <form onSubmit={handleSubmit}>
                <Typography style={styles.logoContainer}>
                    <img
                        src={logo}
                        alt="Tech Amazon Logo"
                        style={styles.logoImg}
                    />
                    Uirapuru
                </Typography>

                <TextField
                    {...textFieldProps}
                    label="E-mail ou nome de usuário"
                    onChange={event => {
                        setUsername(event.target.value)
                    }}
                />
                <TextField
                    {...textFieldProps}
                    label="Senha"
                    type="password"
                    onChange={event => {
                        setPassword(event.target.value)
                    }}
                />

                {loading ? (
                    <div style={styles.loadingContainer}>
                        <CircularProgress style={styles.loading} />
                    </div>
                ) : (
                        <Button
                            type="submit"
                            variant="contained"
                            className={classes.button}
                        >
                            <Typography style={styles.buttonText}>
                                ENTRAR
                        </Typography>
                        </Button>
                    )}

                {loading ? null : (
                    <Typography style={styles.linksContainer}>
                        <Link
                            className={classes.link}
                            onClick={() => {
                                history.push('/forgot-password')
                            }}
                        >
                            Esqueci minha senha
                        </Link>
                        <Link
                            className={classes.link}
                            onClick={() => {
                                history.push('/admin/login')
                            }}
                        >
                            Sou administrador
                        </Link>
                    </Typography>
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
                        <span id="message-id">
                            {errorMessage}, por favor tente novamente
                        </span>
                    }
                />
            </form>
        </Paper>
    )
}

export default Login
