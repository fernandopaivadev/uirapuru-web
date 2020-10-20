import React from 'react'
import { CSVLink } from 'react-csv'

import '../../styles/export.css'

const Export = ({ data }) =>
    <CSVLink
        className='export'
        data={data}
        filename={'uirapuru-chart.csv'}
    >
        Download
    </CSVLink>

export default Export