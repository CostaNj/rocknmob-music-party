import React from 'react'
import {Modal} from 'reactstrap'

export const ErrorModal = ({isOpen, errorMessage}) => {
    return (
        <Modal isOpen = {isOpen} centered>
            {errorMessage}
        </Modal>);
};