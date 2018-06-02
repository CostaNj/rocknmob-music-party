import React from 'react'
import {Modal} from 'reactstrap'

export const ErrorModal = ({isOpen, errorMessage}) => {
    return (
        <Modal isOpen = {isOpen} centered>
            <div style={{
                padding: '15px',
                textAlign: 'center',
                fontSize: '26px'}}>
                {errorMessage}
            </div>
        </Modal>);
};