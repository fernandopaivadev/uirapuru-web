import React from 'react'

import styles from '../../styles/modal'
import util from '../../styles/util'

const Modal = ({ message, taskOnYes, taskOnNo }) =>
    <styles.main>
        <styles.window>
            <p>{ message }</p>
            <div>
                <util.classicButton
                    onClick={taskOnYes}
                >
                    Sim
                </util.classicButton>
                <util.criticalButton
                    onClick= {taskOnNo}
                >
                    Não
                </util.criticalButton>
            </div>
        </styles.window>
    </styles.main>

export default Modal
