import React from 'react'

import '../../styles/menu.css'

const Menu = ({ items, subItemKey }) =>
    <div className='menu'>
        <ul className='items'>
            {items.map((item, index) =>
                <li key={ index }>
                    <p>{ item.name } </p>

                    <ul className='sub-items'>
                        {item[subItemKey].map((subItem, index) =>
                            <li key={ index }>
                                <p>{ subItem.name }</p>
                            </li>
                        )}
                    </ul>
                </li>
            )}
        </ul>
    </div>

export default Menu