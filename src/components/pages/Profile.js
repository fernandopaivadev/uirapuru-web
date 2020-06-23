import React, { useEffect, useState } from 'react'

import { Scope } from '@unform/core'

import NavBar from '../panels/NavBar'

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
        <NavBar />
        <div className='card'>
            {getUser ?
                <form onSubmit={handleSubmit}>
                    <h1>
                        Usuário
                    </h1>
                    <input
                        name='username'
                        label='Nome de usuário'
                        value={user?.username ?? ''}

                    />
                    <input
                        name='email'
                        label='Email'
                        value={user?.email ?? ''}

                    />
                    <input
                        name='phone'
                        label='Telefone'
                        value={formatPhone(user?.phone) ?? ''}

                    />
                    {user?.person ?
                        <Scope path='person'>
                            <input
                                name='cpf'
                                label='CPF'
                                value={formatCPF(user?.person?.cpf) ?? ''}

                            />
                            <input
                                name='birth'
                                label='Data de nascimento'
                                value={formatDate(user?.person?.birth) ?? ''}

                            />
                        </Scope>
                        :
                        <Scope path='company'>
                            <input
                                name='cnpj'
                                label='CNPJ'
                                value={
                                    formatCNPJ(user?.company?.cnpj) ?? '--'
                                }

                            />
                            <input
                                name='name'
                                label='Nome fantasia'
                                value={user?.company?.name ?? ''}

                            />
                            <input
                                name='tradeName'
                                label='Razão social'
                                value={user?.company?.tradeName ?? ''}

                            />
                            <input
                                name='description'
                                label='Descrição'
                                value={user?.company?.description ?? ''}
                            />
                        </Scope>
                    }
                </form>
                : null
            }

            {getConsumerUnit() ?
                <form onSubmit={handleSubmit}>
                    <h1>
                        Unidade consumidora
                    </h1>

                    <input
                        name='number'
                        label='Número'
                        value={consumerUnit?.number ?? ''}

                    />
                    <input
                        name='name'
                        label='Nome'
                        value={consumerUnit?.name ?? ''}

                    />
                    <input
                        name='address'
                        label='Endereço'
                        value={consumerUnit?.address ?? ''}

                    />
                    <input
                        name='zip'
                        label='CEP'
                        value={consumerUnit?.zip ?? ''}

                    />
                    <input
                        name='city'
                        label='Cidade'
                        value={consumerUnit?.city ?? ''}

                    />
                    <input
                        name='state'
                        label='Estado'
                        value={consumerUnit?.state ?? ''}

                    />
                </form>
                : null
            }
        </div>
    </div >
}

export default Profile
