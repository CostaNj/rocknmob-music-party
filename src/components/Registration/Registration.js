import React, {Component} from 'react'
import socketIOClient from 'socket.io-client'

export class Registration extends Component{
    constructor() {
        super();

        this.state = {
            endpoint: "http://localhost:3001"
        }
    }

    send = () => {
        const socket = socketIOClient.connect(this.state.endpoint);
        socket.emit('change color', 'red');
    }

    render() {
        const socket = socketIOClient.connect(this.state.endpoint);
        socket.on('change color', (color) => {
           document.body.style.background = color;
        });

        return(
            <div>
                <h1>Registration</h1>

            </div>
        )
    }
}