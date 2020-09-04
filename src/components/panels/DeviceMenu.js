import React from 'react'

import {getUser} from '../../services/storage'

import '../../styles/devicemenu.css'

const DeviceMenu = ({ setCurrentDevice, setIndex }) =>
    <ul className='devicemenu'>
        {getUser()?.consumerUnits?.map((consumerUnit, index) =>
            <li className='unit'
                key={ index }
                onClick = {() =>{
                    const device = document.querySelector('.devicemenu .unit .devices-list li')

                    if(device.style.display === 'block'){
                        device.style.display = 'none'
                    } else {
                        device.style.display = 'block'
                    }
                }}
            >
                <h1>
                    { consumerUnit.name }
                </h1>

                <ul className='devices-list'>
                    {consumerUnit.devices.map((device, index) =>
                        <li
                            key={ index }
                            onClick = {() => {
                                setCurrentDevice(device)
                                setIndex(device)
                            }}
                        >
                            { device.name }
                        </li>
                    )}
                </ul>
            </li>
        )}
    </ul>



export default DeviceMenu