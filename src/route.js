import React, {Component} from 'react'
import {BrowserRouter, Route } from 'react-router-dom'
import { Enter, Registration, Soon, Main } from './components'

export default class MyRouter extends Component {
    render() {
       return(
           <BrowserRouter>
               <div style={{width: '100%'}}>
                   <Route exact path="/" component={Main}/>
                   <Route exact path="/registration" component={Registration}/>
                   <Route exact path="/enter" component={Enter}/>
                   <Route exact path="/soon" component={Soon}/>
               </div>
           </BrowserRouter>
       )
    }
}