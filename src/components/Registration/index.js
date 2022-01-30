import React, { useEffect, useState   } from 'react'

import { RegistrationTable, ErrorModal, DeleteTrackModal, SortDropdown } from './parts'
import {InputGroup, Input, InputGroupAddon, Button} from 'reactstrap'
import './registration.css'
import axios from "axios";
import get from 'lodash/get'
import { Loader } from '../Loader'

import socketIOClient from "socket.io-client";

const Registration = ({ history }) => {

  const socket = socketIOClient.connect('http://localhost:3002',{reconnect:true, transports: ['websocket', 'polling'] });

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [sortType, setSortType] = useState('date')
  const [sortText, setSortText] = useState('По дате добавления')
  const [trackTitle, setTrackTitle] = useState('')
  const [deletedRowData, setDeletedRowData] = useState(null)
  const [isShowDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isShowDeleteAllDialog, setShowDeleteAllDialog] = useState(false)
  const [errorInfo, setErrorInfo] = useState({
    isShowErrorMessage: false,
    errorMessage: '',
    errorType: '',
    trackOfferLimit: 3,
    participationLimit: 3,
  })
  
  useEffect(() => {
    setLoading(true)
    const user = axios.get('/getSession')
      .then(function (response) {
        //console.log(response);
        if(response.data === '') {
          history.push('/jam');
        } else {
          console.log(response.data)
          setCurrentUser(response.data);
          setLoading(false)
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  }, [])

  socket.on('getData', (info) => {
    setData(info.data)
  });

  socket.on('showErrorModal', (newErrorInfo) => {
    setErrorInfo({
      ...errorInfo,
      isShowErrorMessage: true,
      errorMessage: newErrorInfo.message,
      errorType: newErrorInfo.type,
      trackOfferLimit: newErrorInfo.trackOfferLimit,
      participationLimit: newErrorInfo.participationLimit,
    });
  });

  const addTrack = (newTrackTitle) => {
    if(newTrackTitle !== '') {
      socket.emit('addTrack', { name: newTrackTitle });
      setTrackTitle('')
    }
  };

  const closeErrorDialog = () => {
    setErrorInfo({
      ...errorInfo,
      isShowErrorMessage: false,
      errorMessage: '',
      errorType: ''
    })
  };

  const deleteTrack = (rowData) => {
    if(get(currentUser, 'admin', false)) {
      setDeletedRowData(rowData)
      setShowDeleteDialog(true)
    }
  };

  const deleteDialogResult = (result) => {
    result && deletedRowData && deletedRowData.id ? socket.emit('deleteTrack', deletedRowData.id) : null;
    setDeletedRowData(null)
    setShowDeleteDialog(false)
  };

  const deleteAll = () => {
    if(get(currentUser, 'admin', false)) {
      setShowDeleteAllDialog(true)
    }
  };

  const deleteDialogAllResult = (result) => {
    result ? socket.emit('cleanTable') : null
    setShowDeleteAllDialog(false)
  };

  const setSort = (newSortType, newSortText) => {
    setSortType(sortType)
    setSortText(newSortText)
  };

  return (
    <div style={{width: '100%'}}>
      {loading ?
        <Loader loading={loading}/>
        :
        <div className='registrationFrame'>
          <h1> Регистрация на 30 января 2022г</h1>
          <div style={{color: 'red', lineHeight: '17px', fontSize: '15px'}}>
            Финальный порядок выступлений будет определен в день мероприятия.
          </div>
          <div style={{color: 'red', lineHeight: '17px', fontSize: '15px'}}>
            Первый состав выходит на сцену в 18:00.
          </div>
          <div style={{color: 'red', lineHeight: '24px', fontSize: '22px', marginTop: '10px'}}>
            НОШЕНИЕ МАСОК ОБЯЗАТЕЛЬНО ДЛЯ ВСЕХ !!
          </div>
          <div style={{width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'}}
          >
            <div>
              <SortDropdown
                sortText={sortText}
                setSort={setSort}
              />
            </div>
            <div>
              <img src={currentUser?.photos[0]?.value} style={{borderRadius: '26px', margin: '5px', width: '37px', height: '37px'}}/>
              <a style={{textDecoration: 'none', color: 'white'}} href='/logout'>Выйти</a>
            </div>
          </div>

          <RegistrationTable
            currentUser={currentUser}
            data={data}
            socket={socket}
            deleteTrack = {deleteTrack}
            deleteAllTracks = {deleteAll}
            sortType={sortType}
          />
          <div className="offerSection">
            <InputGroup>
              <Input
                placeholder="Группа - трек"
                value={trackTitle}
                onChange={e => setTrackTitle(e.target.value)}
              />
              <InputGroupAddon addonType="append">
                <Button
                  onClick={() => addTrack(trackTitle)}
                  disabled={trackTitle === ''}
                  color="secondary"
                >
                  Предложить трек
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <ErrorModal
            isOpen={errorInfo.isShowErrorMessage}
            errorMessage={errorInfo.errorMessage}
            errorType={errorInfo.errorType}
            trackOfferLimit={errorInfo.trackOfferLimit}
            participationLimit={errorInfo.participationLimit}
            closeErrorDialog = {closeErrorDialog}
          />
          <DeleteTrackModal
            isOpen={isShowDeleteDialog}
            questionText = 'Вы действительно хотите удалить трек и всех его участников?'
            rowData = {deletedRowData}
            deleteDialogResult ={deleteDialogResult}
          />
          <DeleteTrackModal
            isOpen={isShowDeleteAllDialog}
            questionText = 'Вы действительно хотите очистить таблицу?'
            rowData = {{ name: 'таблицы'}}
            deleteDialogResult ={deleteDialogAllResult}
          />
        </div>
      }
    </div>
  )
}

export default Registration
