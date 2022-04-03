import React from 'react'
import dayjs from 'dayjs'

import './event.css'

export const Event = ({ eventInfo }) => {
  if(!eventInfo) {
    return null
  }
  console.log(eventInfo)

  const type = eventInfo?.type === 'acoustic' ? 'Акустическая' : 'Электрическая'
  const date = dayjs(eventInfo?.date).format('DD.MM.YYYY')
  return (
    <div className='event-container'>
      <div className='event-image-container'>
        <img src={eventInfo?.imgHeader} className='event-image'/>
      </div>
      <div className='event-text-container'>
        <div>
          <div className='event-title'>{eventInfo?.place}</div>
          <div className='event-date'>{date}</div>
        </div>
        <div className='event-description'>{`${type} вечеринка пройдет ${date} в клубе ${eventInfo?.place}`}</div>
      </div>
    </div>
  )
}