import React from 'react'

import styles from '../../styles/menu'

const Menu = ({ title, items, subItemKey, setItemIndex, setSubItemIndex }) =>
    <styles.main>
        <styles.title>
            {title}
        </styles.title>
        <ul>
            {items.map((item, itemIndex) =>
                <li key={ itemIndex }>
                    <styles.itemName
                        aria-label='Unidade Consumidora'
                        onClick={() => {
                            if (setItemIndex) {
                                setItemIndex(itemIndex)
                            }
                        }}
                    >
                        {item.name}
                    </styles.itemName>

                    <ul>
                        {item[subItemKey]?.map((subItem, subItemIndex) =>
                            <li key={subItemIndex}>
                                <styles.subItemName
                                    id={`subItem${subItemIndex}`}
                                    aria-label='Dispositivo'
                                    onClick={() => {
                                        if (setSubItemIndex) {
                                            setSubItemIndex(subItemIndex)
                                        }
                                        if (setItemIndex) {
                                            setItemIndex(itemIndex)
                                        }
                                    }}
                                >
                                    {subItem.name}
                                </styles.subItemName>
                            </li>
                        )}
                    </ul>
                </li>
            )}
        </ul>
    </styles.main>

export default Menu
