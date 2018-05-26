import './css/style.css'
import React, {Component} from 'react'
import ReactDom from 'react-dom'
import MyRouter from './route'
import {Footer} from './components'
import './app.css';
import logo from './res/img/soon.jpg'

class App extends Component {

    render() {
        return(
            <div>
                <div className='backgroundFon'>
                    <img className="headerPromoImg" src={logo}/>
                    <div className="myContainer">
                        <MyRouter/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

ReactDom.render(<App/>, document.getElementById('app'))