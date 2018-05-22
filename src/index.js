import './css/style.css'
import React, {Component} from 'react'
import ReactDom from 'react-dom'
import MyRouter from './route'

class App extends Component {

    render() {
        return(
            <MyRouter/>
        )
    }
}

ReactDom.render(<App/>, document.getElementById('app'))