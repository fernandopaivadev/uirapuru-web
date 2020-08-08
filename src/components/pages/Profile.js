import React, { useEffect, useState } from 'react'
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
        setUser(getUser())
        setConsumerUnit(getConsumerUnit())
    }, [])

    const formatTimeStamp = timeStamp =>
        timeStamp
            ?.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1')

    const formatCEP = cep =>
        cep
            ?.replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')

    const formatCPF = cpf =>
        cpf
            ?.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1-$2')

    const formatCNPJ = cnpj =>
        cnpj
            ?.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{4})(\d)/, '$1-$2')

    const formatPhone = phone =>
        phone
            ?.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')

    return <div className='profile'>
        <NavBar />
        <div className='main'>
            {getUser ?
                <form>
                    <h1>
                        Dados do Usuário
                    </h1>
                    <label>Nome de usuário</label>
                    <input
                        name='username'
                        value={user?.username ?? ''}
                        readOnly
                    />
                    <label>Email</label>
                    <input
                        name='email'
                        value={user?.email ?? ''}
                        readOnly
                    />
                    <label>Telefone</label>
                    <input
                        name='phone'
                        value={formatPhone(user?.phone) ?? ''}
                        readOnly
                    />
                    {user?.person ?
                        <>
                            <label>CPF</label>
                            <input
                                name='cpf'
                                value={formatCPF(user?.person?.cpf) ?? ''}
                                readOnly
                            />
                            <label>Data de nascimento</label>
                            <input
                                name='birth'
                                value={formatTimeStamp(user?.person?.birth) ?? ''}
                                readOnly
                            />
                        </>
                        :
                        <>
                            <label>CNPJ</label>
                            <input
                                name='cnpj'
                                value={
                                    formatCNPJ(user?.company?.cnpj) ?? '--'
                                }
                                readOnly
                            />
                            <label>Nome de usuário</label>
                            <input
                                name='name'
                                value={user?.company?.name ?? ''}
                                readOnly
                            />
                            <label>Razão social</label>
                            <input
                                name='tradeName'
                                value={user?.company?.tradeName ?? ''}
                                readOnly
                            />
                            <label>Descrição</label>
                            <input
                                name='description'
                                value={user?.company?.description ?? ''}
                                readOnly
                            />
                        </>
                    }
                </form>
                : null
            }

            {getConsumerUnit() ?
                <form readOnly>
                    <h1>
                        Dados da Unidade Consumidora
                    </h1>
                    <label>Número</label>
                    <input
                        name='number'
                        value={consumerUnit?.number ?? ''}
                        readOnly
                    />
                    <label>Nome</label>
                    <input
                        name='name'
                        value={consumerUnit?.name ?? ''}
                        readOnly
                    />
                    <label>Endereço</label>
                    <input
                        name='address'
                        value={consumerUnit?.address ?? ''}
                        readOnly
                    />
                    <label>CEP</label>
                    <input
                        name='zip'
                        value={formatCEP(consumerUnit?.zip) ?? ''}
                        readOnly
                    />
                    <label>Cidade</label>
                    <input
                        name='city'
                        value={consumerUnit?.city ?? ''}
                        readOnly
                    />
                    <label>Estado</label>
                    <input
                        name='state'
                        value={consumerUnit?.state ?? ''}
                        readOnly
                    />
                </form>
                : null
            }
        </div>

        {/*<div className='map'>
        <img src='https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap
&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
&markers=color:red%7Clabel:C%7C40.718217,-73.998284
&key=AIzaSyDQR94ajWpJzrd8qHcP1unyJzSD0MnzXS8'/>
        </div>*/}
    </div >
}

export default Profile
