import React from 'react'
import NewDevice from './NewDevice'
import { render, screen } from '@testing-library/react'

const props = {
    isAdmin: true,
    consumerUnitIndex: 0,
    user: {
        id: {
            $oid: '5f8f2ade7consumerUnitIndex159632a4d7768e'
        },
        accessLevel: 'admin',
        company: {
            name: 'Tech Amazon',
            tradeName: 'Tech Amazon - Soluções em Energia Elétrica LTDA',
            cnpj: '332055140001322',
            description: '#############################################################'
        },
        username: 'techamazon',
        email: 'comercial@techamazon.tech',
        phone: '91992533789',
        consumerUnits: [
            {
                _id: {
                    $oid: '5fbaf467b55415002220c037'
                },
                devices: [
                    {
                        _id: {
                            '$oid': '5fbaf467b55415002220c038'
                        },
                        id: '2N042CA',
                        name: 'Fazenda Santa Cruz do Arari'
                    }
                ],
                number: '000000',
                zip: '66635110',
                city: 'Belém',
                state: 'Pará',
                country: 'Brasil',
                address: 'Av. Augusto Montenegro 4300, Ed. Parque Office Sala 1201N',
                name: 'Sala Comercial'
            }
        ]
    }
}

describe('New Device', () => {
    test('Verifica existência dos elementos', () => {
        render(<NewDevice {...props} />)

        expect(screen.getByTestId('title')).toBeInTheDocument()
        expect(screen.getByTestId('idLabel')).toBeInTheDocument()
        expect(screen.getByTestId('deviceId')).toBeInTheDocument()
        expect(screen.getByTestId('deviceNameLabel')).toBeInTheDocument()
        expect(screen.getByTestId('deviceName')).toBeInTheDocument()
        expect(screen.getByTestId('saveDevice')).toBeInTheDocument()
        expect(screen.getByTestId('exit')).toBeInTheDocument()


    })
})