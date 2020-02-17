import React, {
    useEffect,
    useState
} from 'react'

import {
    Paper,
    Avatar
} from '@material-ui/core'

import {
    Edit as EditIcon
} from '@material-ui/icons'

import Layout from '../layouts/Layout'
import { Typography } from '@material-ui/core'
import { isAdmin } from '../../services/auth'
import { getUser, getConsumerUnit } from '../../services/storage'

import themes from '../../themes'

const styles = {
    empty: {
        position: 'absolute',
        textAlign: 'center',
        color: themes.default.lightGray,
        fontSize: '32px',
        fontWeight: 'bold',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)'
    },
    paper: {
        position: 'absolute',
        display: 'flex',
        background: themes.default.white,
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        textAlign: 'left'
    },
    tittle: {
        color: themes.default.green,
        fontSize: '20px',
        fontWeight: 'bold'
    },
    content: {
        color: themes.default.gray,
        fontSize: '24px'
    },
    button: {
        transform: 'translateX(480%)',
        fontSize: '16px',
        background: themes.default.green,
        color: themes.default.white,
        width: '60px',
        height: '60px',
        cursor: 'pointer'
    },
    sectionTitle: {
        color: themes.default.gray,
        fontSize: '35px',
        fontWeight: 'bold',
        alignSelf: 'center',
        margin: '0px 0px 20px 0px'
    },
    section: {
        padding: '20px',
        margin: '20px'
    }
}

const Settings = () => {
    const [user, setUser] = useState({
        person: {},
        consumerUnits: [{
            devices: [{
                mqttInstance: {}
            }]
        }]
    })

    const [consumerUnit, setConsumerUnit] = useState([{
        devices: [{
            mqttInstance: {}
        }]
    }])

    useEffect(() => {
        try {
            setUser(getUser())
            setConsumerUnit(getConsumerUnit())
        }
        catch (err) {
            console.log(err.message)
        }
    }, [])

    const formatDate = timeStamp => {
        try {
            const date = timeStamp.split('T')[0]
            let splitDate = date.split('-')
            splitDate = splitDate.reverse()
            const outputDate = splitDate[0] + '/' + splitDate[1] + '/' + splitDate[2]
            return outputDate
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const formatCPF = cpf => {
        try {
            const splitCPF = cpf.split('')
            let outputCPF = ''

            splitCPF.forEach((character, index) => {
                if ((index === 3) || (index === 6)) {
                    outputCPF += '.'
                }
                else if (index === 9) {
                    outputCPF += '-'
                }

                outputCPF += character
            })

            return outputCPF
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const formatCNPJ = cnpj => {
        try {
            const splitCNPJ = cnpj.split('')
            let outputCNPJ = ''

            splitCNPJ.forEach((character, index) => {
                if ((index === 2) || (index === 5) || (index === 8)) {
                    outputCNPJ += '.'
                }
                else if (index === 12) {
                    outputCNPJ += '/'
                }

                outputCNPJ += character
            })

            return outputCNPJ
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const formatPhone = phone => {
        try {
            const splitPhone = phone.split('')
            let outputPhone = ''

            splitPhone.forEach((character, index) => {
                if (index === 0) {
                    outputPhone += '('
                }
                else if (index === 2) {
                    outputPhone += ') '
                }
                else if ((index === 3) || (index === 7)) {
                    outputPhone += '-'
                }

                outputPhone += character
            })

            return outputPhone
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const Profile = () => {
        return <div style={styles.section}>
            <Typography style={styles.sectionTitle}>
                Perfil
            </Typography>

            <Typography style={styles.tittle}>Nome de usuário:</Typography>
            <Typography style={styles.content}>{user?.username ?? '--'}</Typography>

            <Typography style={styles.tittle}>Email:</Typography>
            <Typography style={styles.content}>{user?.email ?? '--'}</Typography>

            <Typography style={styles.tittle}>Telefone:</Typography>
            <Typography style={styles.content}>{formatPhone(user?.phone) ?? '--'}</Typography>

            <Typography style={styles.tittle}>Descrição do negócio:</Typography>
            <Typography style={styles.content}>{user?.description ?? '--'}</Typography>

            {user?.person ?
                <div>
                    <Typography style={styles.tittle}>Nome:</Typography>
                    <Typography style={styles.content}>{user?.person?.name ?? '--'}</Typography>

                    <Typography style={styles.tittle}>CPF:</Typography>
                    <Typography style={styles.content}>{formatCPF(user?.person?.cpf) ?? '--'}</Typography>

                    <Typography style={styles.tittle}>Data de nascimento:</Typography>
                    <Typography style={styles.content}>{formatDate(user?.person?.birth) ?? '--'}</Typography>
                </div>
                :
                <div>
                    <Typography style={styles.tittle}>Nome Fantasia:</Typography>
                    <Typography style={styles.content}>{user?.company?.name ?? '--'}</Typography>

                    <Typography style={styles.tittle}>Razão Social:</Typography>
                    <Typography style={styles.content}>{user?.company?.tradeName ?? '--'}</Typography>

                    <Typography style={styles.tittle}>CNPJ:</Typography>
                    <Typography style={styles.content}>{formatCNPJ(user?.company?.cnpj) ?? '--'}</Typography>
                </div>
            }
            {isAdmin() ?
                <Avatar
                    style={styles.button}
                    onClick={() => alert('EDIT MODE')}>
                    <EditIcon />
                </Avatar>
                :
                null
            }
        </div>
    }

    const ConsumerUnit = () => {
        return <div style={styles.section}>
            <Typography style={styles.sectionTitle}>
                Unidade Consumidora
            </Typography>

            <Typography style={styles.tittle}>Número:</Typography>
            <Typography style={styles.content}>{consumerUnit?.number ?? '--'}</Typography>

            <Typography style={styles.tittle}>Nome:</Typography>
            <Typography style={styles.content}>{consumerUnit?.name ?? '--'}</Typography>

            <Typography style={styles.tittle}>Endereço:</Typography>
            <Typography style={styles.content}>{consumerUnit?.address ?? '--'}</Typography>

            <Typography style={styles.tittle}>CEP:</Typography>
            <Typography style={styles.content}>{consumerUnit?.zip ?? '--'}</Typography>

            <Typography style={styles.tittle}>Cidade:</Typography>
            <Typography style={styles.content}>{consumerUnit?.city ?? '--'}</Typography>

            <Typography style={styles.tittle}>Estado:</Typography>
            <Typography style={styles.content}>{consumerUnit?.state ?? '--'}</Typography>

            {isAdmin() ?
                <Avatar
                    style={styles.button}
                    onClick={() => alert('EDIT MODE')}>
                    <EditIcon />
                </Avatar>
                : null
            }
        </div>
    }

    return <div>
        <Layout />
        <Paper style={styles.paper}>
            <Profile />
            <ConsumerUnit />
        </Paper>
    </div>
}

export default Settings
