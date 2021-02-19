import React from 'react'
import DevicesList from './DevicesList'
import { render, screen } from '@testing-library/react'

const primaryProps = {
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

const secondaryProps = {
    isAdmin: false,
    consumerUnitIndex: 0,
    user: {
        id: {
            $oid: '5f8f2b8370159632a4d77690'
        },
        accessLevel: 'user',
        company: {
            name: 'NOME FANTASIA',
            tradeName: 'Cadastro de testes',
            cnpj: '000000000000000',
            description: '##############################################################'
        },
        username: 'teste',
        password: '$2b$16$Q54ZttVnGP3iOaggkdhapuBK.yqpR5LKA9hV1Mnpildlm6G2QH9qK',
        email: 'teste@provedor.com',
        phone: '000000000000',
        consumerUnits: [
            {
                _id: {
                    $oid: '5fa1ddb30ef0fa0022d107be'
                },
                devices: [
                    {
                        _id: {
                            $oid: '5fa1ddb30ef0fa0022d107bf'
                        },
                        id: 'ASDASDAs',
                        name: 'Dispositivo 1'
                    },
                    {
                        _id: {
                            $oid: '5fa1ddb30ef0fa0022d107c0'
                        },
                        id: 'BBBBBBB',
                        name: 'Dispositivo 2'
                    },
                    {
                        _id: {
                            $oid: '5fa1ddb30ef0fa0022d107c1'
                        },
                        id: 'BBBbaaaa',
                        name: 'Dispositivo 3'
                    },
                    {
                        _id: {
                            $oid: '5fa1ddb30ef0fa0022d107c2'
                        },
                        id: 'pppppp',
                        name: 'Dispositivo 4'
                    },
                    {
                        _id: {
                            $oid: '5fa1ddb30ef0fa0022d107c3'
                        },
                        id: 'ooooooo',
                        name: 'Dispositivo 5'
                    },
                    {
                        _id: {
                            $oid: '5fa1ddb30ef0fa0022d107c4'
                        },
                        id: 'qqqq',
                        name: 'Dispositivo 6'
                    },
                    {
                        _id: {
                            $oid: '5fa1ddb30ef0fa0022d107c5'
                        },
                        id: 'ddddddd',
                        name: 'Dispositivo 7'
                    },
                    {
                        _id: {
                            $oid: '5fa1ddb30ef0fa0022d107c6'
                        },
                        id: 'gggggg',
                        name: 'Dispositivo 8'
                    }
                ],
                number: '000000',
                zip: '000000000',
                city: 'Belém',
                state: 'Paraaaaa',
                country: 'Brasil',
                address: 'Rua Primeira Joãooooooooooooooo',
                name: 'Unidade 1'
            },
            {
                _id: {
                    $oid: '5fbc00fc9846ae0022722d03'
                },
                number: '5555555555',
                zip: '555555555',
                city: 'Belém',
                state: 'Pará',
                country: 'Brasil',
                address: 'Rua Mangueirão',
                name: 'Unidade 2',
                devices: [
                    {
                        _id: {
                            $oid: '5fdcfa9e87f8cd0020afd07e'
                        },
                        id: 'AAAAAAAa',
                        name: 'Dispositivo 1'
                    }
                ]
            }
        ]
    }
}

const { consumerUnitIndex } = primaryProps

const index = 0

describe('DevicesList', ()=> {
    test('Verifica existência dos elementos como Administrador', () => {
        render(<DevicesList {...primaryProps} />)

        expect(screen.getByTestId('title')).toBeInTheDocument()
        expect(screen.getByTestId('newDevice')).toBeInTheDocument()
        expect(screen.getByTestId(`idLabel${index}`)).toBeInTheDocument()
        expect(
            screen.getByTestId(`deviceId${index}`).value
            ===
            primaryProps.user.consumerUnits[consumerUnitIndex].devices[index].id
            &&
            !screen.getByTestId(`deviceId${index}`).readOnly
        ).toBeTruthy()
        expect(screen.getByTestId(`idName${index}`)).toBeInTheDocument()
        expect(
            screen.getByTestId(`deviceName${index}`).value
            ===
            primaryProps.user.consumerUnits[consumerUnitIndex].devices[index]
                .name
            &&
            !screen.getByTestId(`deviceName${index}`).readOnly
        ).toBeTruthy()
        expect(screen.getByTestId(`saveDevicesList${index}`))
            .toBeInTheDocument()
        expect(screen.getByTestId(`deleteDevicesList${index}`))
            .toBeInTheDocument()

    })

    test('Verifica existência dos elementos como usuário comum', () => {
        render(<DevicesList {...secondaryProps} />)

        expect(screen.getByTestId('title')).toBeInTheDocument()
        expect(screen.queryByTestId('newDevice')).toBeNull()
        expect(screen.getByTestId(`idLabel${index}`)).toBeInTheDocument()
        expect(
            screen.getByTestId(`deviceId${index}`).value
            ===
            secondaryProps.user.consumerUnits[consumerUnitIndex].devices[index].id
            &&
            screen.getByTestId(`deviceId${index}`).readOnly
        ).toBeTruthy()
        expect(screen.getByTestId(`idName${index}`)).toBeInTheDocument()
        expect(
            screen.getByTestId(`deviceName${index}`).value
            ===
            secondaryProps.user.consumerUnits[consumerUnitIndex].devices[index]
                .name
            &&
            screen.getByTestId(`deviceName${index}`).readOnly
        ).toBeTruthy()
        expect(screen.queryByTestId(`saveDevicesList${index}`)).toBeNull()
        expect(screen.queryByTestId(`deleteDevicesList${index}`)).toBeNull()
    })
})