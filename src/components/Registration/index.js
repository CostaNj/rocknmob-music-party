import React, { useEffect, useState   } from 'react'
import dayjs from 'dayjs'
import { MetaTags } from 'react-meta-tags'

import { RegistrationTable, ErrorModal, DeleteTrackModal, SortDropdown } from './parts'
import {InputGroup, Input, InputGroupAddon, Button} from 'reactstrap'
import './registration.css'
import axios from "axios";
import get from 'lodash/get'
import { Layout } from '../../layout'

import { getSocket, openSocketConnection, closeSocketConnection } from '../../socket'

const Registration = ({ history }) => {

  const socket = getSocket()

  const [eventInfo, setEventInfo] = useState(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [eventLoading, setEventLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [sortInfo, setSortInfo] = useState({type: 'date', text: 'По дате добавления'})
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
    setLoading(eventLoading)
    const event = axios.get('/getMainEvent')
      .then(function (response) {
        console.log(response);
        if(response?.data?.state !== 'active' && response?.data?.state !== 'fill') {
          history.push('/soon');
        } else {
          setEventInfo(response.data)
          setEventLoading(false)
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  }, [])
  
  useEffect(() => {
    setLoading(true)
    const user = axios.get('/getSession')
      .then(function (response) {
        //console.log(response);
        if(response.data === '') {
          history.push('/enter');
        } else {
          setCurrentUser(response.data);
          setLoading(false)
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  }, [])

  useEffect(
    () => {
      openSocketConnection()
      const socket = getSocket()
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

      return () => closeSocketConnection()
    },[])

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
    setSortInfo({ type: newSortType, text: newSortText})
  };

  const eventDate = dayjs(eventInfo?.date).format('DD-MM-YYYY')

  return (
    <div style={{width: '100%'}}>
      <MetaTags>
        <meta
          property="og:description"
          content={`Rocknmob Music Party пройдет ${eventDate} в клубе ${eventInfo?.place}`}
        />
        <meta property="og:image" content={eventInfo?.imgLink}/>
        <link rel="image_src" href={eventInfo?.imgLink}/>
      </MetaTags>
      <Layout imageSrc={eventInfo?.imgHeader} loading={loading || eventLoading}>
        <div className='registration-container'>
          <div className='registration-menu'>
            <a style={{textDecoration: 'none', color: 'white'}} href='/'>На главную</a>
            <div>
              <img src={currentUser?.photos[0]?.value} style={{borderRadius: '26px', margin: '5px', width: '37px', height: '37px'}}/>
              <a style={{textDecoration: 'none', color: 'white'}} href='/logout'>Выйти</a>
            </div>
          </div>
          <div className='registration-container-title'>
            <h1> {`Регистрация на ${eventDate}`}</h1>
          </div>
          <div className='registration-menu-btn'>
            <SortDropdown
              sortInfo={sortInfo}
              setSort={setSort}
            />
          </div>
          <RegistrationTable
            currentUser={currentUser}
            data={data}
            deleteTrack = {deleteTrack}
            deleteAllTracks = {deleteAll}
            sortInfo={sortInfo}
            partyType={eventInfo?.type}
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
      </Layout>
    </div>
  )
}

export default Registration
