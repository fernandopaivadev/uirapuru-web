import React from 'react'
import Chart from './Chart'
import { render, screen } from '@testing-library/react'
import 'jest-canvas-mock'

const collection = [
    {
        title: 'Device',
        labels: [
            '03/01 01:04',
            '23/02 13:05'
        ],
        datasets: [
            {
                label: 'T',
                data: [
                    1000,
                    2000
                ]
            },
            {
                label: 'V',
                data: [
                    2000,
                    3000
                ]
            }
        ]
    }
]

const theme = {
    primaryColor: '#309d20',
    primaryLightColor: '#3fc82a',
    secondaryColor: '#712b74',
    primaryFontColor: '#333',
    secondaryFontColor: '#eee',
    backgroundColor: '#eee',
    errorColor: '#bf1a2f',
    errorLightColor: '#f56f55',
    neutralColor: '#555',
    hoveredColor: '#ccc',
    traceColors: [
        '#EFA00B',
        '#1e88e5',
        '#BF1A2F',
        '#454E9E',
        '#9E4E45',
        '#018E42',
        '#9900ff',
        '#f56f55'
    ]
}



describe('Chart', () => {
    // test('Verifica se renderiza a main', () => {
    //     render(<Chart collection={[]} theme={{}} />)

    //     expect(screen.getByTestId('main')).toBeInTheDocument()
    //     expect(screen.queryByTestId('chart')).toBeNull()
    // })

    test('Renderiza Chart', async () => {
        render(<Chart collection={collection} theme={theme} />)
        expect(screen.getByTestId('main')).toBeInTheDocument()
        expect(screen.getByTestId('chart')).toBeInTheDocument()
        expect(screen.getByTestId('title')).toBeInTheDocument()
        expect(screen.getByTestId('chart-0')).toBeInTheDocument()
    })

})