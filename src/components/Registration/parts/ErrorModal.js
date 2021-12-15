import React from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'
import andrey from '../img/andrey.jpg'
import ed from '../img/ed.PNG'

export const ErrorModal = ({isOpen, errorMessage, errorType, closeErrorDialog, trackOfferLimit, participationLimit}) => {

    return (
        <Modal isOpen = {isOpen} centered>
            <ModalHeader toggle={closeErrorDialog}>
                <div style={{width: '100%', textAlign: 'center', color: 'red', fontSize: '20px'}}>
                    Ошибка.&nbsp;{errorMessage}
                </div>
            </ModalHeader>
            <ModalBody>
                <div style={{display: 'flex', flexDirection:'row'}}>
                    <div style={{flex: 4}}>
                        <img style={{borderRadius: '60px', width:'100%', height: 'auto'}} src={errorType === 'instrumentsLimit' ? ed : andrey}/>
                    </div>
                    <div style={{flex: 6}}>
                        <ol>
                            <li>
                                Общее кол-во треков, в которых можно поучаствовать:&nbsp;<span style={{color:'red'}}>{`${participationLimit}`}</span>.
                            </li>
                            <li>
                                Общее кол-во треков, которые можно предложить:&nbsp;<span style={{color:'red'}}>{`${trackOfferLimit}`}</span>.
                            </li>
                            <li>
                                В рамках одного трека можно участвовать на&nbsp;<span style={{color:'red'}}>нескольких позициях</span>&nbsp;
                                (кроме одновременно несовместимых, например: <span style={{color:'red'}}>ударные и бас</span>).
                            </li>
                            <li>
                                Если в композиции нужен один вокалист или гитарист, то можно занять сразу&nbsp;<span style={{color:'red'}}>2 ячейки.</span>&nbsp;
                            </li>
                        </ol>
                    </div>
                </div>
                <p>
                    По вопросам удаления предложенных треков обращайтесь к:&nbsp;
                    <a style={{ cursor: 'pointer', color: '#333333', fontWeight: 'bold'}} href="https://vk.com/id2028637" target="_blank">
                        Нюхтилину Константину
                    </a>
                </p>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={closeErrorDialog}>Закрыть</Button>
            </ModalFooter>
        </Modal>
    )
};