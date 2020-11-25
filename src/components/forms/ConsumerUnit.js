import React from 'react'

import storage from '../../services/storage'

import {
    formatCEP,
    getOnlyNumbers
} from '../../services/forms'

const ConsumerUnitForm = (consumerUnitIndex, isAdmin) => {
    const user = storage.read('user')

    return <form>
        <h1>
            Dados da Unidade Consumidora
        </h1>
        <label>Número</label>
        <input
            name='number'
            minLength='6'
            maxLength='16'
            required
            defaultValue={storage.read('user')
                .consumerUnits[ consumerUnitIndex ]
                ?.number ?? ''}
            readOnly= {!isAdmin}
            onChange={ event => {
                user.consumerUnits[ consumerUnitIndex]
                    .number = event.target.value
            }}
        />
        <p className='error-message'>
            Digite no mínimo 6 caracteres
        </p>

        <label>Nome da unidade consumidora</label>
        <input
            name='name'
            maxLength='64'
            minLength='8'
            required
            defaultValue={storage.read('user')
                .consumerUnits[ consumerUnitIndex ]
                ?.name ?? ''}
            readOnly= {!isAdmin}
            onChange={ event => {
                user.consumerUnits[ consumerUnitIndex]
                    .name = event.target.value
            }}
        />
        <p className='error-message'>
            Digite no mínimo 8 caracteres
        </p>

        <label>Endereço</label>
        <input
            name='address'
            maxLength='256'
            minLength='10'
            required
            defaultValue={storage.read('user')
                .consumerUnits[ consumerUnitIndex ]
                ?.address ?? ''}
            readOnly= {!isAdmin}
            onChange={ event => {
                user.consumerUnits[ consumerUnitIndex]
                    .address = event.target.value
            }}
        />
        <p className='error-message'>
            Digite no mínimo 10 caracteres
        </p>

        <label>CEP</label>
        <input
            name='zip'
            required
            pattern='\d{5}-\d{3}'
            defaultValue={formatCEP(storage.read('user')
                .consumerUnits[ consumerUnitIndex ]?.zip) ?? ''}
            readOnly= {!isAdmin}
            onChange={ event => {
                user
                    .consumerUnits[ consumerUnitIndex]
                    .zip = getOnlyNumbers(event.target.value)
                event.target.value =  formatCEP(event.target
                    .value)
            }}
        />
        <p className='error-message'>
            CEP inválido
        </p>

        <label>Cidade</label>
        <input
            name='city'
            maxLength='64'
            minLength='3'
            required
            defaultValue={storage.read('user')
                .consumerUnits[ consumerUnitIndex ]
                ?.city ?? ''}
            readOnly= {!isAdmin}
            onChange={ event => {
                user.consumerUnits[ consumerUnitIndex]
                    .city = event.target.value
            }}
        />
        <p className='error-message'>
            Digite no mínimo 3 caracteres
        </p>

        <label>Estado</label>
        <input
            name='state'
            maxLength='64'
            minLength='3'
            required
            defaultValue={storage.read('user')
                .consumerUnits[ consumerUnitIndex ]
                ?.state ?? ''}
            readOnly= {!isAdmin}
            onChange={ event => {
                user.consumerUnits[ consumerUnitIndex]
                    .state = event.target.value
            }}
        />
        <p className='error-message'>
            Digite no mínimo 3 caracteres
        </p>
    </form>
}

export default ConsumerUnitForm
