import React, {Component} from 'react'
import socketIOClient from 'socket.io-client'

export class Registration extends Component{
    constructor() {
        super();

        this.state = {
            endpoint: "http://localhost:3001",
            color: 'white'
        };
    }

    componentDidMount() {
        let socket = socketIOClient.connect('http://localhost:3001');
        socket.on('change color', (color) => {
            console.log('change');
            this.setState({ color})
        })
    }


    setColor = (color) => {
        let socket = socketIOClient.connect('http://localhost:3001');
        socket.emit('change color', color);
    };

    render() {
        return(
            <div style={{backgroundColor: this.state.color}}>
                <h1>Registration</h1>
                <button onClick={() => this.setColor('blue')}>Blue</button>
                <button onClick={() => this.setColor('red')}>Red</button>
            </div>
        )
    }
}