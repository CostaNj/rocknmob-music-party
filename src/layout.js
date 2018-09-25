import React from 'react'
import {Footer} from './components'
import './app.css';
import logo from './res/img/header_rocknmob_music_party_6.png'

const Layout = ({children}) => {
  return (
      <div>
          <div className='backgroundFon'>
              <img className="headerPromoImg" src={logo}/>
              <div className="myContainer">
                  {children}
              </div>
          </div>
          <Footer/>
      </div>
  );
};

export {Layout};