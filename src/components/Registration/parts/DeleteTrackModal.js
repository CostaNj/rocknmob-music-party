import React from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'

export const DeleteTrackModal = ({isOpen, questionText, deleteDialogResult, rowData}) => {

    const resultYes = () => {
        deleteDialogResult(true);
    };

    const resultNo = () => {
        deleteDialogResult(false)
    };

    return (
        <Modal isOpen = {isOpen} centered>
            <ModalHeader toggle={resultNo}>Удаление {rowData && rowData.name}</ModalHeader>
            <ModalBody>
                {questionText}
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={resultYes}>Удалить</Button>{' '}
                <Button color="secondary" onClick={resultNo}>Отменить</Button>
            </ModalFooter>
        </Modal>
    );
};