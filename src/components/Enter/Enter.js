import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Enter extends Component{


    render() {
        console.log(this.props);
        return(
            <div>
                <h1>Enter</h1>
                <button onClick={this.logIn}>Go to registration</button>
            </div>
        )
    }

    logIn = () => {
        this.props.history.push('/registration')
    }

}
const EnterWithRouter = withRouter(Enter);

export {EnterWithRouter};