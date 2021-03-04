import React from 'react'
import { HashRouter as Router } from 'react-router-dom'

import UserForm from './UserForm'
import { render, screen } from '@testing-library/react'
import {
    formatPhone,
    formatCNPJ,
    formatCPF,
    formatTimeStamp
} from '../../../services/forms'

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

const secondaryProps ={
    isAdmin: false,
    consumerUnitIndex: 0,
    user: {
        _id: '6034127b627b200020fe5e84',
        accessLevel: 'user',
        username: 'thiagosilva',
        email: 'thiagosilva@provider.com',
        phone: '827349237494',
        person: {
            name: 'thiago silva',
            cpf: '31987381927',
            birth: '1996-02-03T00: 00: 00.000Z'
        },
        consumerUnits: [],
    }
}


describe('UserForm', () => {
    test('Pessoa jurídica e administrador', () => {
        render(
            <Router>
                <UserForm {...primaryProps} />
            </Router>
        )
        expect(screen.getByTestId('title')).toBeInTheDocument()
        expect(screen.getByTestId('usernameLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('username').value
            ===
            primaryProps.user.username
            &&
            !screen.getByTestId('username').readOnly
        ).toBeTruthy()
        expect(screen.getByTestId('emailLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('email').value
            ===
            primaryProps.user.email
            &&
            !screen.getByTestId('email').readOnly
        ).toBeTruthy()
        expect(screen.getByTestId('phoneLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('phone').value
            ===
            formatPhone(primaryProps.user.phone)
            &&
            !screen.getByTestId('phone').readOnly
        ).toBeTruthy()
        expect(screen.getByTestId('cnpjLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('cnpj').value
            ===
            formatCNPJ(primaryProps.user.company.cnpj)
            &&
            !screen.getByTestId('cnpj').readOnly
        ).toBeTruthy()
        expect(screen.getByTestId('nameLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('name').value
            ===
            primaryProps.user.company.name
            &&
            !screen.getByTestId('name').readOnly
        ).toBeTruthy()
        expect(screen.getByTestId('tradeNameLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('tradeName').value
            ===
            primaryProps.user.company.tradeName
            &&
            !screen.getByTestId('tradeName').readOnly
        ).toBeTruthy()
        expect(screen.getByTestId('descriptionLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('description').value
            ===
            primaryProps.user.company.description
            &&
            !screen.getByTestId('description').readOnly
        ).toBeTruthy()

        expect(screen.getByTestId('save')).toBeInTheDocument()
    })

    test('Pessoa física e não administrador', () => {
        render(
            <Router>
                <UserForm {...secondaryProps} />
            </Router>
        )
        expect(screen.getByTestId('title')).toBeInTheDocument()
        expect(screen.getByTestId('usernameLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('username').value
            ===
            secondaryProps.user.username
            &&
            screen.getByTestId('username').readOnly
        ).toBeTruthy()
        expect(screen.getByTestId('emailLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('email').value
            ===
            secondaryProps.user.email
            &&
            screen.getByTestId('email').readOnly
        ).toBeTruthy()
        expect(screen.getByTestId('phoneLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('phone').value
            ===
            formatPhone(secondaryProps.user.phone)
            &&
            screen.getByTestId('phone').readOnly
        ).toBeTruthy()
        expect(screen.getByTestId('nameLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('name').value
            ===
            secondaryProps.user.person.name
            &&
            screen.getByTestId('name').readOnly
        ).toBeTruthy()
        expect(screen.getByTestId('cpfLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('cpf').value
            ===
            formatCPF(secondaryProps.user.person.cpf)
            &&
            screen.getByTestId('cpf').readOnly
        ).toBeTruthy()
        expect(screen.getByTestId('birthLabel')).toBeInTheDocument()
        expect(
            screen.getByTestId('birth').value
            ===
            formatTimeStamp(secondaryProps.user.person.birth)
            &&
            screen.getByTestId('birth').readOnly
        ).toBeTruthy()
        expect(screen.queryByTestId('save')).toBeNull()

    })
})