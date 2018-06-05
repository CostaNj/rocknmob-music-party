import React, {Component} from 'react'
import {BrowserRouter, Route } from 'react-router-dom'
import {Enter, Registration} from './components'

export default class MyRouter extends Component {
    render() {
       return(
           <BrowserRouter>
               <div style={{width: '100%'}}>
                   <Route exact path="/jam/registration" component={Registration}/>
                   <Route exact path="/jam" component={Enter}/>
               </div>
           </BrowserRouter>
       )
    }
}