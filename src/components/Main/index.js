import React, { useEffect, useState, useCallback } from 'react'
import './main.css'
import axios from 'axios'
import { Loader } from '../Loader'

const Main = ({ history }) => {

  const [loading, setLoading] = useState(false)
  const [events, setEvents] = useState([])

  useEffect(() => {
    setLoading(true)
    const events = axios.post('/getActiveEvent')
      .then(function (response) {
        console.log(response)
        setEvents(response.data)
        setLoading(false)
      })
      .catch(function (error) {
        // console.log(error)
        setLoading(false)
      })
  }, [])

  const handleClick = useCallback(() => {
    history.push('/jam/registration')
  }, [])

  if(loading) {
    return <Loader type="fullscreen"/>
  }

  return (
    <div className='main-container'>
      <div className='main-menu'>
        Menu
      </div>
      <div className='main-content'>
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
    </div>
  )
}

export default Main
