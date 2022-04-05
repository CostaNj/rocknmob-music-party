import React, { useEffect, useState} from 'react'
import './enter.css'
import {Button} from 'reactstrap'
import {Loader} from '../Loader'
import axios from 'axios'

export const Enter = ({ history }) => {

  const [loading , setLoading] = useState(false)

  useEffect(() => {
    getSessionUserId()
  }, [])

  const getSessionUserId = () => {
    setLoading(true)
    setTimeout(() => {
      axios.get('/getSession')
        .then(function (response) {
          if (response.data === '') {
            setLoading(false)
          } else {
            history.push('/registration');
          }
        })
        .catch(function (error) {
        });
    }, 2000);
  }

  return (
    <div className='login-container'>
      {loading ?
        <Loader loading={loading}/>
        :
        <div className='login-frame'>
          <div className='back-link'>
            <h3> ПРАВИЛА УЧАСТИЯ </h3>
            Прежде чем зарегистрироваться на мероприятие, необходимо обязательно ознакомиться с
            <a target="_blank" href="https://vk.com/page-157371213_52902223"> правилами участия </a>!
          </div>
          <a href='/auth/vk'>
            <Button color="secondary">
              Войти через VK
            </Button>
          </a>
        </div>
      }
    </div>
  )
}