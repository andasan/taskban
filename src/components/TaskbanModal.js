import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import "./TaskbanModal.css";

const TaskbanModal = ({ close }) => {
    return (
        <div className="modal">
            <button className="close" onClick={close}>
                &times;
            </button>
            <div className="header"> Modal Title </div>
            <div className="content">Test</div>
            <div className="actions">
                <button
                    className="button"
                    onClick={() => {
                        console.log('modal closed ');
                        close();
                    }}
                >
                    close modal
                </button>
            </div>
        </div>
    )
}

export default TaskbanModal
