import React, {Component} from 'react'
import {BrowserRouter, Route } from 'react-router-dom'
import {Enter, Registration, Setlist, Soon, Main} from './components'

export default class MyRouter extends Component {
    render() {
       return(
           <BrowserRouter>
               <div style={{width: '100%'}}>
                   <Route exact path="/" component={Main}/>
                   <Route exact path="/jam/registration" component={Registration}/>
                   <Route exact path="/jam" component={Enter}/>
                   <Route exact path="/jam/setlist" component={Setlist}/>
                   <Route exact path="/jam/soon" component={Soon}/>
               </div>
           </BrowserRouter>
       )
    }
}