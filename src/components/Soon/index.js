import React from 'react'
import YouTube from "react-youtube";

import './soon.css'

export const Soon = () => {

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      mute: 1,
      loop: 1
    },
  }

  return (
    <div className='soon-container'>
      <div className='soon-container-cloud'>
        <div className='back-link'>
          На данный момент нет активных мероприятий, перейти на&nbsp;<a href='/'>главную</a>
        </div>
      </div>
      <YouTube videoId="Mof2D9bB5uU" opts={opts} containerClassName='soon-video' />
    </div>
  );
}
