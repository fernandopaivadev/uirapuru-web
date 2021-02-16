import React from 'react'
import Modal from './Modal'
import { render, screen } from '@testing-library/react'

describe('Modal', () => {
    test('Verifica existência dos elementos', async () => {
        render(<Modal />)
        expect(await screen.findByTestId('window')).toBeTruthy()
        expect(await screen.findByTestId('message')).toBeTruthy()
        expect(await screen.findByTestId('yes')).toBeTruthy()
        expect(await screen.findByTestId('no')).toBeTruthy()
    })
})