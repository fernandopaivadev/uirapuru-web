import React from 'react'

import '../../styles/modal.css'

const Modal = ({ message, taskOnYes, taskOnNo }) =>
    <div className='modal'>
        <div className='window'>
            <p>{ message }</p>
            <div className='buttons'>
                <button
                    className='classic-button'
                    onClick={taskOnYes}
                >
                    Sim
                </button>
                <button
                    id='cancel-button'
                    className='classic-button'
                    onClick= {taskOnNo}
                >
                    Não
                </button>
            </div>
        </div>
    </div>

export default Modal