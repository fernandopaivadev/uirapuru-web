import React from 'react'

import '../../styles/devicemenu.css'

const DeviceMenu = ({ devices, setCurrentDevice, setIndex }) => (
    <ul className='sidebar'>
        {devices.map((device, index) => {
            return <li
                key={index}
                onClick={() => {
                    setCurrentDevice(device)
                    setIndex(index)
                }}
            >
                <h1 className='title'>{device.name}</h1>
                <h1 className='subtitle'>{device.id}</h1>
            </li>
        })
        }
    </ul>
)

export default DeviceMenu