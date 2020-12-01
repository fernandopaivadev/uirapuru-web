import React from 'react'

import storage from '../../services/storage'

const DeviceForm = (consumerUnitIndex, device, isAdmin) => {
    const user = storage.read('user')

    return <ul>
        {user.consumerUnits[consumerUnitIndex]
            .devices.map((device, index) =>
                <li key={index}>
                    <form>
                        <label>
                            ID
                        </label>
                        <input
                            defaultValue={device.id}
                            readOnly={!isAdmin}
                            maxLength='8'
                            minLength='8'
                            onChange={ event => {
                                user
                                    .consumerUnits[
                                        consumerUnitIndex
                                    ]
                                    .devices[index].id
                                    =
                                    event.target.value
                            }}
                        />
                        <p className='error-message'>
                            ID inválido
                        </p>
                        <label>
                            Nome
                        </label>
                        <input
                            defaultValue={device.name}
                            readOnly={!isAdmin}
                            maxLength='20'
                            minLength='6'
                            onChange={ event => {
                                user
                                    .consumerUnits[
                                        consumerUnitIndex
                                    ]
                                    .devices[index].name
                                    =
                                    event.target.value
                            }}
                        />
                        <p className='error-message'>
                            Digite no mínimo 6 caracteres
                        </p>
                    </form>
                </li>
            )
        }
    </ul>
}

export default DeviceForm
