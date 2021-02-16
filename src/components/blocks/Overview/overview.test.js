import React from 'react'
import Overview from './Overview'

import { render, screen } from '@testing-library/react'

const data = {
    t1: '10',
    h1: '20',
    v1: '30',
    i1: '40',
    v2: '50',
    i2: '60'
}

describe('Overview', () => {
    test('Verificar existência dos elementos', () => {
        render(<Overview {...data} />)

        const keys = Object.keys(data)
        console.log(keys)
        expect(screen.getByText('10')).toBeInTheDocument()
        expect(screen.getByText('20')).toBeInTheDocument()
        expect(screen.getByText('30')).toBeInTheDocument()
        expect(screen.getByText('40')).toBeInTheDocument()
        expect(screen.getByText('50')).toBeInTheDocument()
        expect(screen.getByText('60')).toBeInTheDocument()

    })
})