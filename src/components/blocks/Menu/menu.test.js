import React from 'react'
import Menu from './Menu'
import { render, screen } from '@testing-library/react'

const data = [
    {
        name: 'item1',
        subitems: [
            {name: 'subitem1'},
            {name: 'subitem2'},
            {name: 'subitem3'}
        ]
    },
    {
        name: 'item2',
        subitems: [
            {name: 'subitem4'},
            {name: 'subitem5'},
            {name: 'subitem6'}
        ]
    },
    {
        name: 'item3',
        subitems: [
            {name: 'subitem7'},
            {name: 'subitem8'},
            {name: 'subitem9'}
        ]
    }
]

const props = {
    title: 'Unidade Consumidora',
    items: data,
    subItemKey: 'subitems'
}

describe('Teste Menu', () => {
    test('Verifica elementos do Menu', () => {
        render(<Menu {...props} />)

        const title = screen.getByText('Unidade Consumidora')
        expect(title).toBeInTheDocument()

        data.forEach(item => {
            expect(screen.getByText(item.name)).toBeInTheDocument()
            const { subitems } = item
            subitems.forEach(subitem => {
                expect(screen.getByText(subitem.name)).toBeInTheDocument()
            })
        })
    })
})
