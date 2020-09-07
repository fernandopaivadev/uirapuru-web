import React from 'react'

import {getUser} from '../../services/storage'

import '../../styles/devicemenu.css'

const DeviceMenu = ({ setDeviceIndex }) =>
    <ul className='devicemenu'>
        {getUser()?.consumerUnits?.map((consumerUnit, index) =>
            <li className='unit'
                key={ index }
                onClick = {() =>{
                    const device = document.querySelector(
                        '.devicemenu .unit .devices-list .device-name'
                    )

                    if(device.style.display === 'block'){
                        device.style.display = 'none'
                    } else {
                        device.style.display = 'block'
                    }
                }}
            >
                <p>
                    { consumerUnit.name }
                </p>

                <ul className='devices-list'>
                    {consumerUnit.devices.map((device, index) =>
                        <li
                            className='device-name'
                            key={ index }
                            onClick = {() => {
                                setDeviceIndex(index)
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