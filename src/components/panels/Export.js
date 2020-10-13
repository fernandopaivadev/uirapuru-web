import React from 'react'
import { CSVLink } from 'react-csv'

import '../../styles/export.css'

// const data = [
//     ['firstname', 'lastname', 'email'],
//     ['Ahmed', 'Tomi', 'ah@smthing.co.com'],
//     ['Raed', 'Labes', 'rl@smthing.co.com'],
//     ['Yezzi', 'Min l3b', 'ymin@cocococo.com']
// ]

const Export = ({ data }) =>
    <div className='export'>
        <CSVLink
            className='csv-link'
            data={data}
            filename={'uirapuru-chart.csv'}
        >
            Download
        </CSVLink>;
    </div>

export default Export