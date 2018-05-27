import './css/style.css'
import React, {Component} from 'react'
import ReactDom from 'react-dom'
import MyRouter from './route'
import {Layout} from './layout'
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

    render() {
        return(
            <Layout>
                <MyRouter/>
            </Layout>
        )
    }
}

ReactDom.render(<App/>, document.getElementById('app'));