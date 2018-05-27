import React, {Component} from 'react'
import socketIOClient from 'socket.io-client'
import { RegistrationTable } from './parts'
import {InputGroup, Input, InputGroupAddon } from 'reactstrap'
import './registration.css'

export class Registration extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            trackTitle: ''
        };

        this.socket = socketIOClient.connect('http://localhost:3001');
    }

    componentDidMount() {
        this.socket.on('getData', (info) => {
            this.setState({
                data: info.data
            })
        });
    }

    addTrack = (trackTitle) => {
        if(trackTitle !== '') {
            this.socket.emit('addTrack', {owner: 123, name: trackTitle});
        }
    };

    render() {
        return(
            <div>
                <h1>Registration</h1>
                <RegistrationTable data={this.state.data} socket={this.socket}/>
                <div className="offerSection">
                    <InputGroup>
                        <Input
                            placeholder="Группа - трек"
                            value={this.state.trackTitle}
                            onChange={e => this.setState({ trackTitle: e.target.value })}
                        />
                        <InputGroupAddon
                            color="secondary"
                            addonType="append"
                            onClick = {() => this.addTrack(this.state.trackTitle)}
                            disabled={false}
                        >
                            Предложить трек
                        </InputGroupAddon >
                    </InputGroup>
                </div>
            </div>
        )
    }
}