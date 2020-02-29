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

const Login = ({ history }) => {
    const classes = useStyles()

    const [username, setUsername] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [emailSent, setEmailSent] = useState(false)

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

            const response = await api.get(
                `/user/forgot-password?username=${username}`
            )

            const { status } = response

            if (status === 200) {
                setLoading(false)
                setEmailSent(true)
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
                        alt='Tech Amazon Logo'
                        style={styles.logoImg}
                    />
                    Uirapuru
                </Typography>

                {emailSent ? (
                    <Typography style={styles.message}>
                        Enviamos um link para o seu email
                    </Typography>
                ) : (
                    <TextField
                        {...textFieldProps}
                        label='Email ou Nome de usuário'
                        onChange={event => {
                            setUsername(event.target.value)
                        }}
                    />
                )}

                {loading ? (
                    <div style={styles.loadingContainer}>
                        <CircularProgress style={styles.loading} />
                    </div>
                ) : emailSent ? (
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
                        ENVIAR LINK
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
