import React from 'react'

import '../../styles/menu.css'

const Menu = ({ items, subItemKey, setItemIndex, setSubItemIndex }) =>
    <div className='menu'>
        <ul className='items'>
            {items.map((item, itemIndex) =>
                <li key={ itemIndex }>
                    <p
                        className='item-name'
                        onClick={ () => {
                            if (setItemIndex) {
                                setItemIndex(itemIndex)
                            }
                        }}
                    >
                        { item.name }
                    </p>

                    <ul className='sub-items'>
                        {item[subItemKey]?.map((subItem, subItemIndex) =>
                            <li key={ subItemIndex }>
                                <p
                                    className='sub-item-name'
                                    onClick={ () => {
                                        if (setSubItemIndex) {
                                            setSubItemIndex(subItemIndex)
                                        }
                                    }}
                                >
                                    { subItem.name }
                                </p>
                            </li>
                        )}
                    </ul>
                </li>
            )}
        </ul>
    </div>

export default Menu