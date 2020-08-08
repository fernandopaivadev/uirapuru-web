import React from 'react'

import '../../styles/devicemenu.css'

const DeviceMenu = ({ devices, setCurrentDevice, setIndex }) =>
    <ul className='devicemenu'>
        {devices.map((device, index) => {
            return <li
                key={index}
                onClick={() => {
                    for (let k = 0; k < devices.length; k++) {
                        document
                            .querySelector(`.devicemenu li:nth-child(${k + 1})`)
                            .style = 'background-color: none'
                    }

                    document
                        .querySelector(`.devicemenu li:nth-child(${index + 1})`)
                        .style = 'background-color: #333c'

                    const deviceMenu = document
                        .querySelector('.devicemenu')

                    deviceMenu.style.visibility = 'hidden'
                    deviceMenu.style.opacity = 0

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

export default DeviceMenu