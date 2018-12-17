import React, {Component} from 'react'
import socketIOClient from 'socket.io-client'
import { SetlistTable } from './parts'
import {withRouter} from 'react-router-dom'
import './setlist.css'
import axios from "axios";
import {Loader} from '../Loader'
import get from 'lodash/get'


class Setlist extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            trackTitle: '',
            loading: false,
            currentUser: null,
            activeTrackId: null
        };

        this.socket = socketIOClient.connect('https://rocknmob.com',{reconnect:true, transports: ['websocket', 'polling'] });
    }

    componentWillMount() {
        this.getSessionUserId();
    }

    componentDidMount() {
        this.socket.on('getData', (info) => {
            this.setState({
                data: info.data
            })
        });

        this.socket.on('updateCheckTrack', (trackId) => {
            this.setState({
                activeTrackId: trackId
            })
        });

        this.getSessionUserId();
    }

    getSessionUserId = () => {
        let _this = this;
        this.setState({
            loading: true
        });
        setTimeout(()=>{
            axios.get('/getSession')
                .then(function (response) {
                    //console.log(response);
                    if(response.data === '') {
                        _this.props.history.push('/jam');
                    } else {
                        _this.setState({
                            loading: false,
                            currentUser: response.data
                        });
                    }
                })
                .catch(function (error) {
                    // console.log(error);
                });
        }, 2000);
    };

    checkTrack = (rowData) => {
        if(get(this.state, 'currentUser.admin', false)) {
            this.socket.emit('checkNewTrack', rowData.id)
        }
    };

    render() {
        return(
            <div style={{width: '100%'}}>
                {this.state.loading ?
                    <Loader loading={this.state.loading}/>
                    :
                    <div className='registrationFrame'>
                        <h1> Сетлист на 09.12.2018</h1>

                        <div style={{width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center'}}
                        >
                            <div>
                                <img src={this.state.currentUser.photos[0].value} style={{borderRadius: '26px', margin: '5px', width: '37px', height: '37px'}}/>
                                <a style={{textDecoration: 'none', color: 'white'}} href='/logout'>Выйти</a>
                            </div>
                        </div>

                        <SetlistTable
                            data={this.state.data}
                            checkTrack={this.checkTrack}
                            socket={this.socket}
                            activeTrackId={this.state.activeTrackId}
                        />
                    </div>
                }
            </div>
        )
    }
}

const SetlistWithRouter = withRouter(Setlist);

export {SetlistWithRouter};