import React from 'react';
import './footer.css'
import logo from './img/hglogo.png'

const Footer = () => {

    return(
        <div className='footer'>
            <a className="hgLogo" target="_blank" href="http://studio.high-gain.ru">
                <img className="hgLogoImg" alt="" src={logo}/>
            </a>

            <div className="socialLinks">
                <a target="_blank" href="https://new.vk.com/rocknmob">
                    <div className="socialLogo socialLogoVk"></div>
                </a>
                <a target="_blank" href="https://www.youtube.com/c/RocknMob">
                    <div className="socialLogo socialLogoYoutube"></div>
                </a>
                <a target="_blank" href="https://www.instagram.com/rocknmob/">
                    <div className="socialLogo socialLogoInstagram"></div>
                </a>
                <a target="_blank" href="https://www.facebook.com/rocknmob/">
                    <div className="socialLogo socialLogoFacebook"></div>
                </a>
                <a target="_blank" href="https://twitter.com/RocknMob">
                    <div className="socialLogo socialLogoTwitter"></div>
                </a>
            </div>
        </div>
    )
}

export { Footer }

