import React from 'react'
import {Footer} from './components'
import './app.css';
//import baseImageSrc from './res/img/header_rocknmob_music_party_acoustic_30_01_22.png'
import { Loader } from "./components/Loader";

const Layout = ({ children, imageSrc, loading }) => {
  return (
      <>
        <div className='backgroundFon'>
          {
            loading ? <Loader loading={loading} type='fullscreen'/> :
              <>
                {
                  imageSrc && <img className="headerPromoImg" src={imageSrc}/>
                }
                <div className="myContainer">
                  {children}
                </div>
              </>
          }
        </div>
        <Footer/>
      </>
  );
};

export { Layout };