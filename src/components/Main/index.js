import React, { useEffect, useState, useCallback } from 'react'
import './main.css'
import axios from 'axios'
import { Loader } from '../Loader'
import { Footer } from '../Footer'
import { Event } from './event'

const Main = ({ history }) => {

  const [loading, setLoading] = useState(false)
  const [mainEvent, setMainEvent] = useState([])

  useEffect(() => {
    setLoading(true)
    const events = axios.get('/getMainEvent')
      .then(function (response) {
        console.log(response)
        setMainEvent(response.data)
        setLoading(false)
      })
      .catch(function (error) {
        // console.log(error)
        setLoading(false)
      })
  }, [])

  const handleClick = useCallback(() => {
    if(mainEvent?.state !== 'active' && mainEvent?.state !== 'fill') {
      history.push('/soon');
    } else {
      history.push('/registration')
    }
  }, [mainEvent])

  if(loading) {
    return <Loader type="fullscreen"/>
  }

  return (
    <>
      <div className='main-page'>
        <div className='main-menu'>
        </div>
        <div className='main-container'>
          <div className='title-container'>
            <div className='main-title'>
              ROCKNMOB MUSIC PARTY
            </div>
            <div className='second-title'>
              Приходи и оторвись вместе с нами!
            </div>
            <div className='description'>
              Импровизированные музыкальные составы.<br/>
              Огненный сет-лист. Бесконечный драйв!<br/>
              Пой и играй любимые треки!<br/>
            </div>
            <div className='register-button-container'>
              <button className='register-button' onClick={handleClick}>Зарегистрироваться</button>
            </div>
          </div>
          {
            mainEvent?.state !== 'close' && (
              <>
                <div className='main-border'/>
                <div className='events-container'>
                  <div className='events-title'>
                    Ближайшее мероприятие
                  </div>
                  <div>
                    <Event eventInfo={mainEvent}/>
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div>
      <div className={mainEvent?.state === 'close' ? 'footer-container' : ''}>
        <Footer/>
      </div>

    </>
  )
}

export default Main
