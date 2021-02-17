import React from 'react'
import NavBar from './NavBar'
import { render, screen } from '@testing-library/react'
import { HashRouter as Router } from 'react-router-dom'

const primaryProps = {
    user: {
        username: 'xuser',
        email: 'xuser@provider.com'
    },
    username: 'admin',
    isAdmin: true,
    isDarkMode: false,
}

const secondaryProps = {
    user: {
        username: 'admin',
        email: 'admin@provider.com'
    },
    username: 'admin',
    isAdmin: true,
    isDarkMode: false,
}


describe('NavBar', () => {
    test('Caso com um usuário setado', () => {
        render(
            <Router>
                <NavBar {...primaryProps}/>
            </Router>
        )
        expect(screen.getByAltText('tech amazon logo')).toBeInTheDocument()
        expect(screen.getByText('Uirapuru')).toBeInTheDocument()

        expect(screen.getByTestId('toggle')).toBeInTheDocument()
        expect(screen.getByText(
            `${primaryProps.username} | ${primaryProps.user.username}`
        )).toBeInTheDocument()

        expect(screen.getByTestId('avatar')).toBeInTheDocument()
        expect(
            screen.getByTestId('avatar').innerHTML
            ===
            primaryProps.user.username.split('')[0].toUpperCase()
        ).toBeTruthy()

        expect(
            screen.getByTestId('profileAvatar').innerHTML
            ===
            primaryProps.user.username.split('')[0].toUpperCase()
        ).toBeTruthy()
        expect(
            screen.getByTestId('textInfo').innerHTML.includes(primaryProps.user.username)
        ).toBeTruthy()

        expect(
            screen.getByTestId('textInfo').innerHTML.includes(primaryProps.user.email)
        ).toBeTruthy()
        expect(screen.getByText('Usuários')).toBeInTheDocument()
        expect(screen.getByText('Dashboard')).toBeInTheDocument()
        expect(screen.getByText('Perfil')).toBeInTheDocument()
        expect(screen.getByText('Sair')).toBeInTheDocument()
    })

    test('Caso com nenhum usuário setado', () => {
        render(
            <Router>
                <NavBar {...secondaryProps} />
            </Router>
        )

        console.log(screen.getByTestId('textInfo').innerHTML)

        expect(
            screen.getByTestId('username').innerHTML
            ===
            secondaryProps.username
        ).toBeTruthy()

        expect(
            screen.getByTestId('avatar').innerHTML
            ===
            secondaryProps.user.username.split('')[0].toUpperCase()
        ).toBeTruthy()

        expect(
            screen.getByTestId('profileAvatar').innerHTML
            ===
            secondaryProps.user.username.split('')[0].toUpperCase()
        ).toBeTruthy()

        expect(
            screen.getByTestId('textInfo').innerHTML.includes(secondaryProps.user.username)
        ).toBeTruthy()

        expect(
            screen.getByTestId('textInfo').innerHTML.includes(secondaryProps.user.email)
        ).toBeTruthy()
    })
})