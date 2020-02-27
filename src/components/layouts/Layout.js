import React, { useState, useEffect, memo } from 'react'
import { withRouter } from 'react-router-dom'

import {
    Typography,
    Avatar,
    IconButton,
    Dialog,
    DialogContentText,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Tooltip,
    Menu,
    MenuItem
} from '@material-ui/core'

import {
    Close as CloseIcon,
    Room as RoomIcon,
    Face as FaceIcon,
    Dashboard as DashboardIcon,
    Add as AddIcon
} from '@material-ui/icons'

import {
    storeUser,
    getUser,
    getConsumerUnit,
    storeConsumerUnit,
    getUsersList
} from '../../services/storage'

import { isAuthenticated, isAdmin, logout } from '../../services/auth'
import logo from '../../assets/logo.svg'

import themes from '../../themes'

const Layout = ({ history }) => {
    const styles = {
        navbar: {
            width: '100vw',
            height: '55px',
            display: 'flex',
            justifyContent: 'space-around',
            color: themes.default.white,
            background: `${themes.default.black}c`
        },
        logo: {
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            marginRight: 'auto'
        },
        logoAvatar: {
            marginRight: '15px',
            marginLeft: '15px'
        },
        profile: {
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 'auto'
        },
        consumerUnit: {
            display: 'flex',
            height: '100%',
            width: '33vw',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            cursor: 'pointer'
        },
        title: {
            fontSize: '20px',
            fontWeight: '600',
            letterSpacing: '1.5px',
            fontFamily: 'vibrocentric'
        },
        consumerUnitTitle: {
            fontSize: '20px',
            fontWeight: '500',
            letterSpacing: '1.5px'
        },
        link: {
            width: '100%',
            cursor: 'pointer',
            display: 'flex'
        },
        name: {
            fontSize: '20px',
            color: themes.default.green,
            fontWeight: '500'
        },
        number: {
            fontSize: '18px',
            color: themes.default.gray,
            fontWeight: '500'
        },
        address: {
            fontSize: '18px',
            color: themes.default.gray
        },
        dialogTitle: {
            fontSize: '28px',
            color: themes.default.gray,
            fontWeight: '500',
            textAlign: 'center',
            margin: '0px 0px -20px 0px'
        },
        empty: {
            fontSize: '24px',
            color: themes.default.lightGray,
            fontWeight: '500',
            margin: '20px'
        }
    }

    const [usersPopup, setUsersPopup] = useState(isAdmin() && !getUser())
    const [consumerUnitsPopup, setConsumerUnitsPopup] = useState(
        !getConsumerUnit()
    )
    const [profilePopup, setProfilePopup] = useState(null)

    useEffect(() => {
        if (!isAuthenticated()) {
            history.push('/login')
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <nav>
                <ul style={styles.navbar}>
                    <li style={styles.logo} key="logo">
                        <Avatar src={logo} style={styles.logoAvatar} />

                        <Typography style={styles.title}>
                            Uirapuru
                            {isAdmin() ? ' [Admin]' : null}
                        </Typography>
                    </li>
                    <li
                        style={styles.consumerUnit}
                        key="consumer-unit"
                        onClick={() => {
                            setConsumerUnitsPopup(true)
                        }}
                    >
                        {getConsumerUnit() ? (
                            <Typography style={styles.consumerUnitTitle}>
                                {getConsumerUnit()?.name}
                            </Typography>
                        ) : null}
                    </li>
                    <li style={styles.profile} key="profile">
                        {isAdmin() ? (
                            <Tooltip title="Usuários">
                                <IconButton
                                    onClick={() => {
                                        setUsersPopup(true)
                                    }}
                                    color="inherit"
                                >
                                    <FaceIcon />
                                </IconButton>
                            </Tooltip>
                        ) : null}
                        <Tooltip title="Unidades Consumidoras">
                            <IconButton
                                onClick={() => {
                                    setConsumerUnitsPopup(true)
                                }}
                                color="inherit"
                            >
                                <RoomIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Dashboard">
                            <IconButton
                                onClick={() => {
                                    history.push('/dashboard')
                                }}
                                color="inherit"
                            >
                                <DashboardIcon />
                            </IconButton>
                        </Tooltip>
                        {isAdmin() && !getUser() ? (
                            <Tooltip title="Sair">
                                <IconButton
                                    onClick={() => {
                                        logout()
                                        history.push('/login')
                                    }}
                                    color="inherit"
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Perfil">
                                <IconButton
                                    onClick={event => {
                                        setProfilePopup(event.currentTarget)
                                    }}
                                    color="inherit"
                                >
                                    <Avatar
                                        style={{
                                            background: themes.default.green
                                        }}
                                    >
                                        {getUser()?.person
                                            ? getUser()?.person?.name.split(
                                                  ''
                                              )[0]
                                            : getUser()?.company?.tradeName.split(
                                                  ''
                                              )[0]}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                        )}
                        {getUser() ? (
                            <Menu
                                anchorEl={profilePopup}
                                keepMounted
                                open={Boolean(profilePopup)}
                                onClose={() => {
                                    setProfilePopup(null)
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Avatar
                                        style={{
                                            background: themes.default.green,
                                            color: themes.default.white,
                                            margin: '0px 0px 0px 20px'
                                        }}
                                    >
                                        {getUser().person
                                            ? getUser()?.person?.name.split(
                                                  ''
                                              )[0]
                                            : getUser()?.company?.tradeName.split(
                                                  ''
                                              )[0]}
                                    </Avatar>
                                    <Typography
                                        style={{
                                            color: themes.default.green,
                                            margin: '15px 16px 10px 16px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {getUser()?.username}
                                    </Typography>
                                </div>
                                <Typography
                                    style={{
                                        color: themes.default.gray,
                                        margin: '15px 16px 10px 16px'
                                    }}
                                >
                                    {getUser()?.email}
                                </Typography>
                                <MenuItem
                                    style={{
                                        border: `1px solid ${themes.default.lightGray}`
                                    }}
                                    onClick={() => {
                                        history.push('/settings')
                                    }}
                                >
                                    Meus Dados
                                </MenuItem>
                                <MenuItem
                                    style={{
                                        borderBottom: `1px solid ${themes.default.lightGray}`
                                    }}
                                    onClick={() => {
                                        logout()
                                        history.push('/login')
                                    }}
                                >
                                    Sair
                                </MenuItem>
                            </Menu>
                        ) : null}
                        {isAdmin() ? (
                            <Dialog
                                open={usersPopup}
                                onClose={() => {
                                    setUsersPopup(false)
                                }}
                                scroll="body"
                            >
                                <DialogTitle>
                                    <Typography style={styles.dialogTitle}>
                                        Escolha o Usuário
                                    </Typography>
                                </DialogTitle>
                                {getUsersList().length <= 0 ? (
                                    <DialogContentText style={styles.empty}>
                                        Não há usuários cadastrados
                                    </DialogContentText>
                                ) : (
                                    <List>
                                        {getUsersList().map(user => (
                                            <ListItem
                                                key="User"
                                                button
                                                style={styles.link}
                                                onClick={() => {
                                                    storeUser(user)
                                                    window.location.reload(
                                                        false
                                                    )
                                                }}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar
                                                        style={{
                                                            background:
                                                                themes.default
                                                                    .green
                                                        }}
                                                    >
                                                        <RoomIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>
                                                    <Typography
                                                        style={styles.name}
                                                    >
                                                        {user?.username}
                                                    </Typography>
                                                    <Typography
                                                        style={styles.number}
                                                    >
                                                        {user?.email}
                                                    </Typography>
                                                    <Typography
                                                        style={styles.address}
                                                    >
                                                        {' '}
                                                        {`${user?.person?.name.split(
                                                            ' '
                                                        )[0] ??
                                                            user?.company?.tradeName.split(
                                                                ' '
                                                            )[0]}
                                                    ${user?.person?.name.split(
                                                        ' '
                                                    )[1] ??
                                                        user?.company?.tradeName.split(
                                                            ' '
                                                        )[1]}`}
                                                    </Typography>
                                                </ListItemText>
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                                {isAdmin() ? (
                                    <ListItem
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            margin: '0px 0px 10px 0px'
                                        }}
                                    >
                                        <Tooltip title="Cadastrar Usuário">
                                            <IconButton
                                                onClick={() => {
                                                    alert('ADD USER')
                                                }}
                                            >
                                                <Avatar
                                                    style={{
                                                        background:
                                                            themes.default
                                                                .green,
                                                        width: '40px'
                                                    }}
                                                >
                                                    <AddIcon />
                                                </Avatar>
                                            </IconButton>
                                        </Tooltip>
                                    </ListItem>
                                ) : null}
                            </Dialog>
                        ) : null}
                        {getUser() ? (
                            <Dialog
                                open={consumerUnitsPopup}
                                onClose={() => {
                                    setConsumerUnitsPopup(false)
                                }}
                                scroll="body"
                            >
                                <DialogTitle>
                                    <Typography style={styles.dialogTitle}>
                                        Escolha a Unidade Consumidora
                                    </Typography>
                                </DialogTitle>
                                {getUser()?.consumerUnits?.length <= 0 ? (
                                    <DialogContentText style={styles.empty}>
                                        Não há unidades consumidoras cadastradas
                                    </DialogContentText>
                                ) : (
                                    <List>
                                        {getUser()?.consumerUnits?.map(
                                            consumerUnit => (
                                                <ListItem
                                                    button
                                                    style={styles.link}
                                                    onClick={() => {
                                                        storeConsumerUnit(
                                                            consumerUnit
                                                        )
                                                        document.location.reload(
                                                            true
                                                        )
                                                    }}
                                                    key={consumerUnit?.number}
                                                >
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            style={{
                                                                background:
                                                                    themes
                                                                        .default
                                                                        .green
                                                            }}
                                                        >
                                                            <RoomIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText>
                                                        <Typography
                                                            style={styles.name}
                                                        >
                                                            {consumerUnit?.name}
                                                        </Typography>
                                                        <Typography
                                                            style={
                                                                styles.number
                                                            }
                                                        >
                                                            UC:{' '}
                                                            {
                                                                consumerUnit?.number
                                                            }
                                                        </Typography>
                                                        <Typography
                                                            style={
                                                                styles.address
                                                            }
                                                        >
                                                            {
                                                                consumerUnit?.address
                                                            }
                                                        </Typography>
                                                    </ListItemText>
                                                </ListItem>
                                            )
                                        )}
                                    </List>
                                )}
                                {isAdmin() ? (
                                    <ListItem
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            margin: '0px 0px 10px 0px'
                                        }}
                                    >
                                        <Tooltip title="Cadastrar Unidade">
                                            <IconButton
                                                onClick={() => {
                                                    alert('ADD U.C.')
                                                }}
                                            >
                                                <Avatar
                                                    style={{
                                                        background:
                                                            themes.default
                                                                .green,
                                                        width: '40px'
                                                    }}
                                                >
                                                    <AddIcon />
                                                </Avatar>
                                            </IconButton>
                                        </Tooltip>
                                    </ListItem>
                                ) : null}
                            </Dialog>
                        ) : null}
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default withRouter(memo(Layout))
