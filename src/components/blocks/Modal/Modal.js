import React from 'react'

import styles from './Modal.style'
import util from '../../../util/util.style'

const Modal = ({ message, taskOnYes, taskOnNo }) =>
    <styles.main>
        <styles.window
            data-testid='window'
        >
            <p data-testid='message'>
                { message }
            </p>
            <div>
                <util.classicButton
                    id='yes'
                    data-testid='yes'
                    onClick={taskOnYes}
                >
                    Sim
                </util.classicButton>
                <util.criticalButton
                    id='no'
                    data-testid='no'
                    onClick= {taskOnNo}
                >
                    Não
                </util.criticalButton>
            </div>
        </styles.window>
    </styles.main>

export default Modal
