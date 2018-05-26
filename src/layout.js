import React from 'react'
import {Footer} from './components'
import './app.css';
import logo from './res/img/soon.jpg'

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