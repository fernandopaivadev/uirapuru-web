import React, { useState } from 'react'
import NavBar from '../panels/NavBar'
import { getUser } from '../../services/storage'
//import { api } from '../../services/api'

import '../../styles/newrecord.css'

const NewUser = () => {
    const [userType, setUserType] = useState(0)
    const [consumerUnitOwner, setConsumerUnitOwner] = useState(0)

    let newUser = {}

    const registerUser = () => {
        newUser = {
            username: document.querySelector('#username').value,
            email: document.querySelector('#email').value,
            phone: document.querySelector('#phone').value
        }

        if (userType === 0) {
            newUser.name = document.querySelector('#person-name').value
            newUser.cpf = document.querySelector('#cpf').value
            newUser.birth = document.querySelector('#birth').value
        } else if (userType === 1) {
            newUser.cnpj = document.querySelector('#cnpj').value
            newUser.tradeName = document.querySelector('#trade-name').value
            newUser.companyName= document.querySelector('#company-name').value
            newUser.description = document.querySelector('#description').value
        }
    }

    const registerConsumerUnit = async () => {
        const newConsumerUnit = {
            number: document.querySelector('#unit-number').value,
            name: document.querySelector('#unit-name').value,
            address: document.querySelector('#unit-address').value,
            zip: document.querySelector('#unit-zip').value,
            city: document.querySelector('#unit-city').value,
            state: document.querySelector('#unit-state').value
        }

        let user = {}

        if(consumerUnitOwner === 0) {
            user = getUser()
            user.consumerUnits.push(newConsumerUnit)
        } else if (consumerUnitOwner === 1) {
            user = newUser
            user.consumerUnits.push(newConsumerUnit)
        }
    }

    return <div className='new-user'>
        <NavBar />
        <div className='main'>
            <form onSubmit={registerUser}>
                <h1>
                    Novo Usuário
                </h1>
                <label>Nome de usuário</label>
                <input
                    id='username'
                />
                <label>Email</label>
                <input
                    id='email'
                />
                <label>Telefone</label>
                <input
                    id='phone'
                    type='number'
                />

                <div className='select'>
                    <label>Selecione:</label>
                    <select
                        onChange={event => {
                            setUserType(event.target.options.selectedIndex)
                        }}
                    >
                        <option value='PF'>Pessoa Física</option>
                        <option value='PJ'>Pessoa Jurídica</option>
                    </select>
                </div>

                {userType === 0 ?
                    <>
                        <label>Nome</label>
                        <input
                            id='person-name'
                        />
                        <label>CPF</label>
                        <input
                            id='cpf'
                            type='number'
                        />
                        <label>Data de nascimento</label>
                        <input
                            id='birth'
                        />
                    </>
                    :
                    null
                }

                {userType === 1 ?
                    <>
                        <label>CNPJ</label>
                        <input
                            id='cnpj'
                            type='number'
                        />
                        <label>Razão social</label>
                        <input
                            id='trade-name'
                        />
                        <label>Nome Fantasia</label>
                        <input
                            id='company-name'
                        />
                        <label>Descrição</label>
                        <input
                            id='description'
                        />
                    </>
                    :
                    null
                }

                <button onClick={event => {
                    event.preventDefault()
                    registerUser()
                }}>
                    Cadastrar
                </button>
            </form>

            <form onSubmit={registerUser}>
                <h1>
                    Nova Unidade Consumidora
                </h1>

                <div className='select'>
                    <label>Selecione:</label>
                    <select
                        onChange={event => {
                            setConsumerUnitOwner(event.target.options.selectedIndex)
                        }}
                    >
                        <option>Do usuário atual</option>
                        <option>Do novo usuário</option>
                    </select>
                </div>

                <label>Número</label>
                <input
                    id='unit-number'
                    type='number'
                />
                <label>Nome</label>
                <input
                    id='unit-name'
                />
                <label>Endereço</label>
                <input
                    id='unit-address'
                />
                <label>CEP</label>
                <input
                    id='unit-zip'
                    type='number'
                />
                <label>Cidade</label>
                <input
                    id='unit-city'
                />
                <label>Estado</label>
                <input
                    id='unit-state'
                />

                <button onClick={event => {
                    event.preventDefault()
                    registerConsumerUnit()
                }}>
                    Cadastrar
                </button>
            </form>
        </div>

    </div>
}

export default NewUser