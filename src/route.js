import React, {Component} from 'react'
import {BrowserRouter, Route } from 'react-router-dom'
import {Enter, Registration} from './components'

export default class MyRouter extends Component {
    render() {
       return(
           <div>
               <BrowserRouter>
                   <div>
                       <Route exact path="/registration" component={Registration}/>
                       <Route exact path="/" component={Enter}/>
                   </div>
               </BrowserRouter>
           </div>
       )
    }
}