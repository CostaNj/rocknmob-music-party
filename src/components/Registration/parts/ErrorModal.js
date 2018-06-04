import React from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'

export const ErrorModal = ({isOpen, errorMessage, closeErrorDialog}) => {

    return (
        <Modal isOpen = {isOpen} centered>
            <ModalHeader toggle={closeErrorDialog}>
                <div style={{width: '100%', textAlign: 'center', color: 'red', fontSize: '20px'}}>
                    Ошибка.&nbsp;{errorMessage}
                </div>
            </ModalHeader>
            <ModalBody>

                <div>
                    <ol>
                        <li>
                            Допускается участие в&nbsp;<span style={{color:'red'}}>3 треках</span>&nbsp;и возможность предложить
                            &nbsp;<span style={{color:'red'}}>3 композиции</span>.
                        </li>
                        <li>
                            В рамках одного трека можно участвовать на&nbsp;<span style={{color:'red'}}>нескольких позициях</span>&nbsp;
                            (например гитара + вокал).
                        </li>
                        <li>
                            Если в композиции нужен один вокалист, то можно занять сразу&nbsp;<span style={{color:'red'}}>2 ячейки.</span>&nbsp;
                        </li>
                    </ol>
                    <p>
                        По вопросам удаления предложенных треков обращайтесь к:&nbsp;
                        <a style={{ cursor: 'pointer', color: '#333333', fontWeight: 'bold'}} href="https://vk.com/id2028637" target="_blank">
                            Нюхтилину Константину
                        </a>
                    </p>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={closeErrorDialog}>Закрыть</Button>
            </ModalFooter>
        </Modal>
    )
};