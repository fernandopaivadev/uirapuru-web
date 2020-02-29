import React, { useEffect, useState } from 'react'

import { Paper, Avatar } from '@material-ui/core'

import { Edit as EditIcon } from '@material-ui/icons'

import { Scope } from '@unform/core'
import { Form } from '@unform/web'

import Layout from '../layouts/Layout'
import Input from '../forms/Input'

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
    button: {
        transform: 'translateX(480%)',
        fontSize: '16px',
        background: themes.default.green,
        color: themes.default.white,
        width: '60px',
        height: '60px',
        cursor: 'pointer'
    },
    section: {
        padding: '20px',
        margin: '20px'
    },
    input: {
        fontSize: '20px',
        color: '#333',
        border: '2px solid',
        borderRadius: '3px',
        borderColor: themes.default.green,
        padding: '10px',
        margin: '10px 0 10px 0'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    }
}

const Settings = () => {
    const [user, setUser] = useState({
        person: {},
        consumerUnits: [
            {
                devices: [
                    {
                        mqttInstance: {}
                    }
                ]
            }
        ]
    })

    const [consumerUnit, setConsumerUnit] = useState([
        {
            devices: [
                {
                    mqttInstance: {}
                }
            ]
        }
    ])

    useEffect(() => {
        try {
            setUser(getUser())
            setConsumerUnit(getConsumerUnit())
        } catch (err) {
            console.log(err.message)
        }
    }, [])

    const formatDate = timeStamp => {
        try {
            const date = timeStamp.split('T')[0]
            let splitDate = date.split('-')
            splitDate = splitDate.reverse()
            const outputDate =
                splitDate[0] + '/' + splitDate[1] + '/' + splitDate[2]
            return outputDate
        } catch (err) {
            console.log(err.message)
        }
    }

    const formatCPF = cpf => {
        try {
            const splitCPF = cpf.split('')
            let outputCPF = ''

            splitCPF.forEach((character, index) => {
                if (index === 3 || index === 6) {
                    outputCPF += '.'
                } else if (index === 9) {
                    outputCPF += '-'
                }

                outputCPF += character
            })

            return outputCPF
        } catch (err) {
            console.log(err.message)
        }
    }

    const formatCNPJ = cnpj => {
        try {
            const splitCNPJ = cnpj.split('')
            let outputCNPJ = ''

            splitCNPJ.forEach((character, index) => {
                if (index === 2 || index === 5 || index === 8) {
                    outputCNPJ += '.'
                } else if (index === 12) {
                    outputCNPJ += '/'
                }

                outputCNPJ += character
            })

            return outputCNPJ
        } catch (err) {
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
                } else if (index === 2) {
                    outputPhone += ') '
                } else if (index === 3 || index === 7) {
                    outputPhone += '-'
                }

                outputPhone += character
            })

            return outputPhone
        } catch (err) {
            console.log(err.message)
        }
    }

    const Profile = () => (
        <div style={styles.section}>
            <Form style={styles.form}>
                <Input
                    name='username'
                    label='Nome de usuário'
                    defaultValue={user?.username ?? ''}
                    style={styles.input}
                />
                <Input
                    name='email'
                    label='Email'
                    defaultValue={user?.email ?? ''}
                    style={styles.input}
                />
                <Input
                    name='phone'
                    label='Telefone'
                    defaultValue={formatPhone(user?.phone) ?? ''}
                    style={styles.input}
                />
                {user?.person ? (
                    <Scope path='person'>
                        <Input
                            name='cpf'
                            label='CPF'
                            defaultValue={formatCPF(user?.person?.cpf) ?? ''}
                            style={styles.input}
                        />
                        <Input
                            name='birth'
                            label='Data de nascimento'
                            defaultValue={formatDate(user?.person?.birth) ?? ''}
                            style={styles.input}
                        />
                    </Scope>
                ) : (
                    <Scope path='company'>
                        <Input
                            name='cnpj'
                            label='CNPJ'
                            defaultValue={
                                formatCNPJ(user?.company?.cnpj) ?? '--'
                            }
                            style={styles.input}
                        />
                        <Input
                            name='name'
                            label='Nome fantasia'
                            defaultValue={user?.company?.name ?? ''}
                            style={styles.input}
                        />
                        <Input
                            name='tradeName'
                            label='Razão social'
                            defaultValue={user?.company?.tradeName ?? ''}
                            style={styles.input}
                        />
                    </Scope>
                )}
            </Form>

            {isAdmin() ? (
                <Avatar
                    style={styles.button}
                    onClick={() => alert('EDIT MODE')}>
                    <EditIcon />
                </Avatar>
            ) : null}
        </div>
    )

    const ConsumerUnit = () => (
        <div style={styles.section}>
            <Form style={styles.form}>
                <Input
                    name='number'
                    label='Número'
                    defaultValue={consumerUnit?.number ?? ''}
                    style={styles.input}
                />
                <Input
                    name='name'
                    label='Nome'
                    defaultValue={consumerUnit?.name ?? ''}
                    style={styles.input}
                />
                <Input
                    name='address'
                    label='Endereço'
                    defaultValue={consumerUnit?.address ?? ''}
                    style={styles.input}
                />
                <Input
                    name='zip'
                    label='CEP'
                    defaultValue={consumerUnit?.zip ?? ''}
                    style={styles.input}
                />
                <Input
                    name='city'
                    label='Cidade'
                    defaultValue={consumerUnit?.city ?? ''}
                    style={styles.input}
                />
                <Input
                    name='state'
                    label='Estado'
                    defaultValue={consumerUnit?.state ?? ''}
                    style={styles.input}
                />
            </Form>

            {isAdmin() ? (
                <Avatar
                    style={styles.button}
                    onClick={() => alert('EDIT MODE')}>
                    <EditIcon />
                </Avatar>
            ) : null}
        </div>
    )

    return (
        <>
            <Layout />
            <Paper style={styles.paper}>
                <Profile />
                <ConsumerUnit />
            </Paper>
        </>
    )
}

export default Settings
