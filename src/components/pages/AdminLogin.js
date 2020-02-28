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
import { adminLogin, isAuthenticated } from '../../services/auth'
import { api } from '../../services/api'
import logo from '../../assets/logo.svg'

import themes from '../../themes'

const useStyles = makeStyles(() => ({
    paper: {
        position: 'absolute',
        display: 'flex',
        background: themes.default.white,
        padding: '30px',
        textAlign: 'center',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        maxWidth: '350px',
        width: '60%'
    },
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
    progress: {
        marginTop: '30px',
        justifyContent: 'center'
    },
    progressLine: {
        color: themes.default.green
    },
    logo: {
        width: '50px',
        padding: '10px'
    },
    logoHeader: {
        display: 'flex',
        fontSize: '35px',
        color: themes.default.black,
        alignItems: 'center',
        marginBottom: '20px'
    },
    forgotPassword: {
        fontSize: '16px',
        color: themes.default.black,
        textAlign: 'center',
        marginTop: '20px'
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

            const { status } = response

            if (status === 200) {
                setLoading(false)
                adminLogin(response.data.token)
                history.push('/loading')
            }
        } catch (err) {
            console.log(err.response.data.message)

            if (err.response.status === 404) {
                setErrorMessage('Administrador não encontrado')
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

    const textFieldProps = {
        id: 'outlined-name',
        required: true,
        margin: 'normal',
        variant: 'outlined',
        className: classes.textField
    }

    return (
        <Paper className={classes.paper}>
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
                    label="Nível de acesso"
                    onChange={event => {
                        setLevel(event.target.value)
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
                    <div className={classes.progress}>
                        <CircularProgress className={classes.progressLine} />
                    </div>
                ) : (
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            <Typography>ENTRAR</Typography>
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
