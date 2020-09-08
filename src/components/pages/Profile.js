import React, { useState } from 'react'

import NavBar from '../panels/NavBar'

import DeviceMenu from '../panels/DeviceMenu'

import { getUser } from '../../services/storage'

import '../../styles/profile.css'

const formatPhone = phone =>
        phone
            ?.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
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

const formatCEP = cep =>
        cep
            ?.replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')

const formatTimeStamp = timeStamp =>
        timeStamp
            ?.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1')


const Profile = ({ history }) => {
    const [ consumerUnitIndex, setConsumerUnitIndex ] = useState()

    return <div className='profile'>
        <NavBar />
        <DeviceMenu
            setConsumerUnitIndex = { setConsumerUnitIndex }/>
        <div className='main'>
            <div className='forms'>
                {getUser ?
                    <form>
                        <h1>
                            Dados do Usuário
                        </h1>
                        <label>Nome de usuário</label>
                        <input
                            name='username'
                            value={getUser()?.username ?? ''}
                            readOnly
                        />
                        <label>Email</label>
                        <input
                            name='email'
                            value={getUser()?.email ?? ''}
                            readOnly
                        />
                        <label>Telefone</label>
                        <input
                            name='phone'
                            value={formatPhone(getUser()?.phone) ?? ''}
                            readOnly
                        />
                        {getUser()?.person ?
                            <>
                                <label>CPF</label>
                                <input
                                    name='cpf'
                                    value={formatCPF(getUser()?.person?.cpf) ?? ''}
                                    readOnly
                                />
                                <label>Data de nascimento</label>
                                <input
                                    name='birth'
                                    value={formatTimeStamp(getUser()?.person?.birth) ?? ''}
                                    readOnly
                                />
                            </>
                            :
                            <>
                                <label>CNPJ</label>
                                <input
                                    name='cnpj'
                                    value={
                                        formatCNPJ(getUser()?.company?.cnpj) ?? '--'
                                    }
                                    readOnly
                                />
                                <label>Nome de usuário</label>
                                <input
                                    name='name'
                                    value={getUser()?.company?.name ?? ''}
                                    readOnly
                                />
                                <label>Razão social</label>
                                <input
                                    name='tradeName'
                                    value={getUser()?.company?.tradeName ?? ''}
                                    readOnly
                                />
                                <label>Descrição</label>
                                <input
                                    name='description'
                                    value={getUser()?.company?.description ?? ''}
                                    readOnly
                                />
                            </>
                        }
                    </form>
                    : null
                }

                {getUser().consumerUnits[ consumerUnitIndex ] ?
                    <form readOnly>
                        <h1>
                                Dados da Unidade Consumidora
                        </h1>
                        <label>Número</label>
                        <input
                            name='number'
                            value={getUser().consumerUnits[ consumerUnitIndex ]?.number ?? ''}
                            readOnly
                        />
                        <label>Nome</label>
                        <input
                            name='name'
                            value={getUser().consumerUnits[ consumerUnitIndex ]?.name ?? ''}
                            readOnly
                        />
                        <label>Endereço</label>
                        <input
                            name='address'
                            value={getUser().consumerUnits[ consumerUnitIndex ]?.address ?? ''}
                            readOnly
                        />
                        <label>CEP</label>
                        <input
                            name='zip'
                            value={formatCEP(getUser().consumerUnits[ consumerUnitIndex ]?.zip) ?? ''}
                            readOnly
                        />
                        <label>Cidade</label>
                        <input
                            name='city'
                            value={getUser().consumerUnits[ consumerUnitIndex ]?.city ?? ''}
                            readOnly
                        />
                        <label>Estado</label>
                        <input
                            name='state'
                            value={getUser().consumerUnits[ consumerUnitIndex ]?.state ?? ''}
                            readOnly
                        />
                    </form>
                    :
                    <div className='empty'>
                        <p>Escolha uma unidade Consumidora</p>
                    </div>
                }
            </div>
            <div className='navigation'>
                <button
                    onClick={() =>{
                        history.push('/dashboard')
                    }}
                >
                    Dashboard
                </button>
            </div>
        </div>
    </div>
}

export default Profile