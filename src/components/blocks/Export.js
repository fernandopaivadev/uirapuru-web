import React from 'react'
import { CSVLink } from 'react-csv'

import styled from 'styled-components'

const styles = {
    container: styled.section`
        display: flex;
        align-items: center;
        height: 4rem;

        .export {
            width: 100%;
            height: 100%;
            text-decoration: none;
            font-size: 2rem;
            font-weight: 600;
            color: var(--secondary-font-color);
            background: var(--primary-color);
            padding: 0.7rem 1.5rem 0 1.5rem;
            border-radius: 0.3rem;
            transition: all ease 0.2s;

            &:hover {
                background: var(--primary-light-color);
            }
        }
    `
}

const Export = ({ data }) =>
    <styles.container>
        <CSVLink
            className='export'
            data={data}
            filename={'uirapuru-chart.csv'}
        >
            Download CSV
        </CSVLink>
    </styles.container>

export default Export
