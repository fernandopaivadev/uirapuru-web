import React, { useEffect, useState } from 'react'

import { Scope } from '@unform/core'
import { Form } from '@unform/web'

import Layout from '../layouts/Layout'
import Input from '../forms/Input'

import { getUser, getConsumerUnit } from '../../services/storage'

import '../../styles/profile.css'

const Profile = () => {
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

    const handleSubmit = () => {
        alert('SUBMIT')
    }

    return <div className='profile'>
        <Layout />
        <div className='card'>
            {getUser?
                <Form onSubmit={handleSubmit}>
                    <h1>
                    Usuário
                    </h1>
                    <Input
                        name='username'
                        label='Nome de usuário'
                        defaultValue={user?.username ?? ''}

                    />
                    <Input
                        name='email'
                        label='Email'
                        defaultValue={user?.email ?? ''}

                    />
                    <Input
                        name='phone'
                        label='Telefone'
                        defaultValue={formatPhone(user?.phone) ?? ''}

                    />
                    {user?.person ?
                        <Scope path='person'>
                            <Input
                                name='cpf'
                                label='CPF'
                                defaultValue={formatCPF(user?.person?.cpf) ?? ''}

                            />
                            <Input
                                name='birth'
                                label='Data de nascimento'
                                defaultValue={formatDate(user?.person?.birth) ?? ''}

                            />
                        </Scope>
                        :
                        <Scope path='company'>
                            <Input
                                name='cnpj'
                                label='CNPJ'
                                defaultValue={
                                    formatCNPJ(user?.company?.cnpj) ?? '--'
                                }

                            />
                            <Input
                                name='name'
                                label='Nome fantasia'
                                defaultValue={user?.company?.name ?? ''}

                            />
                            <Input
                                name='tradeName'
                                label='Razão social'
                                defaultValue={user?.company?.tradeName ?? ''}

                            />
                        </Scope>
                    }
                </Form>
                : null
            }

            {getConsumerUnit() ?
                <Form onSubmit={handleSubmit}>
                    <h1>
                    Unidade consumidora
                    </h1>

                    <Input
                        name='number'
                        label='Número'
                        defaultValue={consumerUnit?.number ?? ''}

                    />
                    <Input
                        name='name'
                        label='Nome'
                        defaultValue={consumerUnit?.name ?? ''}

                    />
                    <Input
                        name='address'
                        label='Endereço'
                        defaultValue={consumerUnit?.address ?? ''}

                    />
                    <Input
                        name='zip'
                        label='CEP'
                        defaultValue={consumerUnit?.zip ?? ''}

                    />
                    <Input
                        name='city'
                        label='Cidade'
                        defaultValue={consumerUnit?.city ?? ''}

                    />
                    <Input
                        name='state'
                        label='Estado'
                        defaultValue={consumerUnit?.state ?? ''}

                    />
                </Form>
                : null
            }
        </div>
    </div>
}

export default Profile
