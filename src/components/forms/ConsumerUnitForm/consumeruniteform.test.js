import React from 'react'
import ConsumerUnitForm from './ConsumerUnitForm'
import { render, screen } from '@testing-library/react'
import {HashRouter as Router} from 'react-router-dom'
import { formatCEP } from '../../../services/forms'

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

describe('ConsumerUnitForm', () => {
    test('Verifica existência dos elementos Is Admin', () => {
        render(
            <Router>
                <ConsumerUnitForm {...primaryProps} />
            </Router>
        )

        expect(screen.getByTestId('title')).toBeInTheDocument()

        expect(screen.getByTestId('numberLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('number').value
            ===
            primaryProps.user.consumerUnits[consumerUnitIndex].number
            &&
            !screen.getByTestId('number').readOnly
        ).toBeTruthy()

        expect(screen.getByTestId('unitNameLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('unitName').value
            ===
            primaryProps.user.consumerUnits[consumerUnitIndex].name
            &&
            !screen.getByTestId('unitName').readOnly
        ).toBeTruthy()

        expect(screen.getByTestId('addressLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('address').value
            ===
            primaryProps.user.consumerUnits[consumerUnitIndex].address
            &&
            !screen.getByTestId('address').readOnly
        ).toBeTruthy()

        expect(screen.getByTestId('zipLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('zip').value
            ===
            formatCEP(primaryProps.user.consumerUnits[consumerUnitIndex].zip)
            &&
            !screen.getByTestId('zip').readOnly
        ).toBeTruthy()

        expect(screen.getByTestId('cityLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('city').value
            ===
            primaryProps.user.consumerUnits[consumerUnitIndex].city
            &&
            !screen.getByTestId('city').readOnly
        ).toBeTruthy()

        expect(screen.getByTestId('stateLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('state').value
            ===
            primaryProps.user.consumerUnits[consumerUnitIndex].state
            &&
            !screen.getByTestId('state').readOnly
        ).toBeTruthy()

        expect(screen.getByTestId('deleteUnit')).toBeInTheDocument()
        expect(screen.getByTestId('newUnit')).toBeInTheDocument()
        expect(screen.getByTestId('saveUnit')).toBeInTheDocument()

    })

    test('Verifica existência dos elementos Is Admin', () => {
        render(
            <Router>
                <ConsumerUnitForm {...secondaryProps} />
            </Router>
        )

        expect(screen.getByTestId('title')).toBeInTheDocument()

        expect(screen.getByTestId('numberLabel')).toBeInTheDocument()

        expect(
            screen.getByTestId('number').value
            ===
            secondaryProps.user.consumerUnits[consumerUnitIndex].number
            &&
            screen.getByTestId('number').readOnly
        ).toBeTruthy()

        expect(screen.getByTestId('unitNameLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('unitName').value
            ===
            secondaryProps.user.consumerUnits[consumerUnitIndex].name
            &&
            screen.getByTestId('unitName').readOnly
        ).toBeTruthy()

        expect(screen.getByTestId('addressLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('address').value
            ===
            secondaryProps.user.consumerUnits[consumerUnitIndex].address
            &&
            screen.getByTestId('address').readOnly
        ).toBeTruthy()

        expect(screen.getByTestId('zipLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('zip').value
            ===
            formatCEP(secondaryProps.user.consumerUnits[consumerUnitIndex].zip)
            &&
            screen.getByTestId('zip').readOnly
        ).toBeTruthy()

        expect(screen.getByTestId('cityLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('city').value
            ===
            secondaryProps.user.consumerUnits[consumerUnitIndex].city
            &&
            screen.getByTestId('city').readOnly
        ).toBeTruthy()

        expect(screen.getByTestId('stateLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('state').value
            ===
            secondaryProps.user.consumerUnits[consumerUnitIndex].state
            &&
            screen.getByTestId('state').readOnly
        ).toBeTruthy()

        expect(screen.queryByTestId('deleteUnit')).toBeNull()
        expect(screen.queryByTestId('newUnit')).toBeNull()
        expect(screen.queryByTestId('saveUnit')).toBeNull()
    })
})