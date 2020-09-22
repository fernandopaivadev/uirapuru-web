import React from 'react'

import '../../styles/menu.css'

const Menu = ({ items, setItemIndex, setSubItemIndex }) =>
    <ul className='menu'>
        {items?.map((item, index) =>
            <li className='item'
                key={ index }
                onClick = {() =>{
                    if(setItemIndex) {
                        setItemIndex(index)
                    }
                }}
            >
                <p>
                    { item.name }
                </p>

                <ul className='devices-list'>
                    {item?.devices.map((subItem, index) =>
                        <li
                            className='device-name'
                            key={ index }
                            onClick = {() => {
                                if(subItem) {
                                    setSubItemIndex(index)
                                }
                            }}
                        >
                            { subItem.name }
                        </li>
                    )}
                </ul>
            </li>
        )}
    </ul>

export default Menu

