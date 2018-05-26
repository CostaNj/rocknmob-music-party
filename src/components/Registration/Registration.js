import React, {Component} from 'react'
import socketIOClient from 'socket.io-client'

export class Registration extends Component{
    constructor() {
        super();
        this.state = {
            endpoint: "http://localhost:3001",
            data: []
        };

        this.socket = socketIOClient.connect('http://localhost:3001');
    }

    componentDidMount() {
        this.socket.on('getData', (data) => {
            console.log('data: ', data);
        });
    }

    addTrack = (info) => {
        this.socket.emit('addTrack', info);
    };

    render() {
        return(
            <div style={{backgroundColor: this.state.color}}>
                <h1>Registration</h1>
                <button onClick={() => this.addTrack('test track info')}>addTrack</button>
            </div>
        )
    }
}