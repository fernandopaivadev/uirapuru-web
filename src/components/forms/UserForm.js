import React from 'react'

import {
    formatUsername,
    formatPhone,
    formatCPF,
    formatCNPJ,
    formatTimeStamp,
    formatDate,
    getOnlyNumbers
} from '../../services/forms'

import styles from '../../styles/userform'

const UserForm = ({ isAdmin, user }) => {
    return <styles.form>
        <styles.title>
            Dados do Usuário
        </styles.title>

        <label>Nome de usuário</label>
        <input
            name='username'
            maxLength='20'
            minLength='6'
            required
            defaultValue={user?.username ?? ''}
            readOnly= {!isAdmin}
            onChange={ event => {
                user.username = event.target.value
                event.target.value = formatUsername(
                    event.target.value
                )
            }}
        />
        <p className='error-message'>
            Digite no mínimo 6 caracteres
        </p>

        <label>Email</label>
        <input
            name='email'
            maxLength='40'
            minLength='10'
            required
            defaultValue={user?.email ?? ''}
            readOnly= {!isAdmin}
            onChange={ event => {
                user.email = event.target.value
            }}
        />
        <p className='error-message'>
            Digite no mínimo 10 caracteres
        </p>

        <label>Telefone</label>
        <input
            name='phone'
            required
            pattern='\(\d{2}\) \d{5}-\d{4}$'
            defaultValue={formatPhone(user?.phone) ?? ''}
            readOnly= {!isAdmin}
            onChange={ event => {
                user.phone = getOnlyNumbers(event.target.value)
                event.target.value =  formatPhone(
                    event.target.value
                )
            }}
        />
        <p className='error-message'>
            Número de telefone inválido
        </p>

        {user?.person ?
            <>
                <label>Nome completo</label>
                <input
                    name='name'
                    maxLength='128'
                    minLength='10'
                    required
                    defaultValue={user?.person
                        ?.name ?? ''}
                    readOnly= {!isAdmin}
                    onChange={ event => {
                        user.person.name = event.target.value
                    }}
                />
                <p className='error-message'>
                    Digite no mínimo 10 caracteres
                </p>

                <label>CPF</label>
                <input
                    name='cpf'
                    required
                    pattern='\d{3}\.\d{3}\.\d{3}-\d{2}'
                    defaultValue={formatCPF(user?.person
                        ?.cpf) ?? ''}
                    readOnly= {!isAdmin}
                    onChange={ event => {
                        user.person.cpf = getOnlyNumbers(
                            event.target.value
                        )
                        event.target.value =  formatCPF(
                            event.target.value
                        )
                    }}
                />
                <p className='error-message'>
                    CPF inválido
                </p>

                <label>Data de nascimento</label>
                <input
                    name='birth'
                    required
                    pattern='\d{2}\/\d{2}\/\d{4}'
                    defaultValue={formatTimeStamp(
                        user?.person?.birth
                    ) ?? ''}
                    readOnly= {!isAdmin}
                    onChange={ event => {
                        user.person.birth = event.target.value
                        event.target.value = formatDate(
                            event.target.value
                        )
                    }}
                />
                <p className='error-message'>
                    Data inválida
                </p>
            </>
            :
            <>
                <label>CNPJ</label>
                <input
                    name='cnpj'
                    required
                    pattern='\d{2}\.\d{3}\.\d{3}.\d{4}-\d{2}'
                    defaultValue={
                        formatCNPJ(
                            user?.company?.cnpj
                        ) ?? '--'
                    }
                    readOnly= {!isAdmin}
                    onChange={ event => {
                        user.company.cnpj = getOnlyNumbers(
                            event.target.value
                        )
                        user.phone = event.target.value
                        event.target.value =  formatCNPJ(
                            event.target.value
                        )
                    }}
                />
                <p className='error-message'>
                    CNPJ inválido
                </p>

                <label>Nome Fantasia</label>
                <input
                    name='name'
                    maxLength='128'
                    minLength='6'
                    required
                    defaultValue={user?.company
                        ?.name ?? ''}
                    readOnly= {!isAdmin}
                    onChange={ event => {
                        user.company.name = event
                            .target
                            .value
                    }}
                />
                <p className='error-message'>
                    Digite no mínimo 6 caracteres
                </p>

                <label>Razão social</label>
                <input
                    name='tradeName'
                    maxLength='128'
                    minLength='6'
                    required
                    defaultValue={user?.company
                        ?.tradeName ?? ''}
                    readOnly= {!isAdmin}
                    onChange={ event => {
                        user.company.tradeName = event
                            .target
                            .value
                    }}
                />
                <p className='error-message'>
                                    Digite no mínimo 6 caracteres
                </p>

                <label>Descrição</label>
                <input
                    name='description'
                    maxLength='512'
                    minLength='50'
                    required
                    defaultValue={user?.company
                        ?.description ?? ''}
                    readOnly= {!isAdmin}
                    onChange={ event => {
                        user.company.description = event
                            .target
                            .value
                    }}
                />
                <p className='error-message'>
                    Digite no mínimo 50 caracteres
                </p>
            </>
        }
    </styles.form>
}

export default UserForm
