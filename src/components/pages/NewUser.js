import React, { useState } from 'react'

import NavBar from '../panels/NavBar'

import DeviceMenu from '../panels/DeviceMenu'

import { api } from '../../services/api'

import '../../styles/newuser.css'

const formatPhone = phone =>
        phone
            ?.replace(/\D/g, '')
            .replace(/(\d{11})(\d)/, '$1')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')

const formatCPF = cpf =>
        cpf
            ?.replace(/\D/g, '')
            .replace(/(\d{11})(\d)/, '$1')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1-$2')

const formatCNPJ = cnpj =>
        cnpj
            ?.replace(/\D/g, '')
            .replace(/(\d{14})(\d)/, '$1')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{4})(\d)/, '$1-$2')

const formatCEP = cep =>
        cep
            ?.replace(/\D/g, '')
            .replace(/(\d{8})(\d)/, '$1')
            .replace(/(\d{5})(\d)/, '$1-$2')

const formatDate = input =>
    input
        .replace(/\D/g, '')
        .replace(/(\d{8})(\d)/, '$1')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2')

const NewUser = () => {
    const user = {
        username: '',
        password: '',
        email: '',
        phone: '',
        company: {},
        tradeName: '',
        cnpj: '',
        stateSubscription: '',
        cpf: '',
        birth: '',
        consumerUnits: []
    }

    const consumerUnit = {
        number: '',
        zip: '',
        city: '',
        state: '',
        country: '',
        address: '',
        name: '',
        devices: []
    }

    const [step, setStep] = useState(1)
    const [userType, setUserType] = useState('company')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const resetForm = () => {
        document.querySelector('form').reset()
    }

    const handleSubmit = async event => {
        try {
            event.preventDefault()
            const response = await api.post('/user/add', user)

            const status = response?.status

            if (status === 200) {
                setSuccess(true)

                setTimeout(() => {
                    setSuccess(false)
                }, 1500)
            } else {
                setError(true)

                setTimeout(() => {
                    setError(false)
                }, 1500)
            }
        } catch (err) {
            console.log(err?.message ?? err?.response?.data?.message)

            const status = err?.response?.status

            if (status) {
                setError(true)
            }
        }
    }

    return <div className='newuser'>
        <NavBar />
        <DeviceMenu />
        <div className='main'>
            {step === 0 ?
                <form onSubmit={() => { setStep(1) }}>
                    <h1>
                        Dados do usuário
                    </h1>
                    <label>Nome de usuário</label>
                    <input
                        name='username'
                        required
                        onChange={ event => {
                            user.username = event.target.value
                        }}
                    />
                    <label>Senha</label>
                    <input
                        type='password'
                        name='password'
                        required
                        onChange={ event => {
                            user.password = event.target.value
                        }}
                    />
                    <label>Email</label>
                    <input
                        name='email'
                        required
                        onChange={ event => {
                            user.email = event.target.value
                        }}
                    />
                    <label>Telefone</label>
                    <input
                        name='phone'
                        required
                        onChange={ event => {
                            user.phone = event.target.value.match(/\d+/g)
                            event.target.value =  formatPhone(
                                event.target.value
                            )
                        }}
                    />
                    <div className='checkbox'>
                        <input
                            type='checkbox'
                            onClick={() => {
                                if (userType === 'company') {
                                    setUserType('person')
                                    delete consumerUnit.company
                                    consumerUnit.person = {}
                                } else if (userType === 'person') {
                                    setUserType('company')
                                    delete consumerUnit.person
                                    consumerUnit.company = {}
                                }
                            }}
                        />
                        <label>Sou pessoa física</label>
                    </div>
                    {userType === 'company' ?
                        <>
                            <label>CNPJ</label>
                            <input
                                name='cnpj'
                                onChange={ event => {
                                    user.company.cnpj = event
                                        .target.value.match(/\d+/g)
                                    event.target.value =  formatCNPJ(
                                        event.target.value
                                    )
                                }}
                            />
                            <label>Razão social</label>
                            <input
                                name='tradeName'
                                onChange={ event => {
                                    user.company.tradeName = event
                                        .target
                                        .value
                                }}
                            />
                            <label>Descrição</label>
                            <input
                                name='description'
                                onChange={ event => {
                                    user.company.description = event
                                        .target
                                        .value
                                }}
                            />
                        </>
                        :
                        <>
                            <label>CPF</label>
                            <input
                                name='cpf'
                                onChange={ event => {
                                    user.person.cpf = event
                                        .target.value.match(/\d+/g)
                                    event.target.value =  formatCPF(
                                        event.target.value
                                    )
                                }}
                            />
                            <label>Data de nascimento</label>
                            <input
                                name='birth'
                                onChange={ event => {
                                    user.person.birth = event.target.value
                                    event.target.value = formatDate(
                                        event.target.value
                                    )
                                }}
                            />
                        </>
                    }
                    <button type='submit'>
                        Avançar
                    </button>
                </form>
                :
                null
            }

            {step === 1 ?
                <form onSubmit={ () => { }}>
                    <h1>
                        Dados da Unidade Consumidora
                    </h1>
                    <label>Número</label>
                    <input
                        name='number'
                        required
                        onChange={ event => {
                            consumerUnit
                                .number = event.target.value
                        }}
                    />
                    <label>Nome</label>
                    <input
                        name='name'
                        required
                        onChange={ event => {
                            consumerUnit
                                .name = event.target.value
                        }}
                    />
                    <label>Endereço</label>
                    <input
                        name='address'
                        required
                        onChange={ event => {
                            consumerUnit
                                .address = event.target.value
                        }}
                    />
                    <label>CEP</label>
                    <input
                        name='zip'
                        required
                        onChange={ event => {
                            consumerUnit
                                .zip = event.target.value.match(/\d+/g)
                            event.target.value =  formatCEP(event.target
                                .value)
                        }}
                    />
                    <label>Cidade</label>
                    <input
                        name='city'
                        required
                        onChange={ event => {
                            consumerUnit
                                .city = event.target.value
                        }}
                    />
                    <label>Estado</label>
                    <input
                        name='state'
                        required
                        onChange={ event => {
                            consumerUnit
                                .state = event.target.value
                        }}
                    />

                    <div className='buttons'>
                        <button onClick={()=>
                            setStep(0)
                        }>
                            Voltar
                        </button>
                        <button
                            type='submit'
                            onClick={ event => {
                                event.preventDefault()
                                user.consumerUnits.push(consumerUnit)
                                resetForm()
                            }}
                        >
                            Adicionar UC
                        </button>

                        <button
                            type='submit'
                            onClick={ event => {
                                handleSubmit(event)
                            }}
                        >
                            Salvar
                        </button>
                    </div>
                    {success && !error?
                        <p className='success'>
                            Salvo com sucesso!
                        </p>
                        : null
                    }
                    {!success && error?
                        <p className='error'>
                            Ocorreu um erro
                        </p>
                        : null
                    }
                </form>
                :
                null
            }
        </div>
    </div>
}

export default NewUser

// {success[0] && !error[0]?
//     <p className='success'>
//         Salvo com sucesso!
//     </p>
//     : null
// }
// {!success[0] && error[0]?
//     <p className='error'>
//         Ocorreu um erro
//     </p>
//     : null
// }
