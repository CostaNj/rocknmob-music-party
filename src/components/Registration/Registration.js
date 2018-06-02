import React, {Component} from 'react'
import socketIOClient from 'socket.io-client'
import { RegistrationTable, ErrorModal } from './parts'
import {withRouter} from 'react-router-dom'
import {ScaleLoader} from 'react-spinners'
import {InputGroup, Input, InputGroupAddon, Button} from 'reactstrap'
import './registration.css'
import axios from "axios";


class Registration extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            trackTitle: '',
            loading: false,
            currentUser: null,
            isShowErrorMessage: false,
            errorMessage: ''
        };

        this.socket = socketIOClient.connect('http://localhost:3002');
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

        this.socket.on('showErrorModal', (errorInfo) => {
            console.log(errorInfo);
            this.setState({
                isShowErrorMessage: true,
                errorMessage: errorInfo.message
            });
            setTimeout(()=> this.setState({
                isShowErrorMessage: false,
                errorMessage: ''
            }), 3000);
        });

        this.getSessionUserId();
    }

    addTrack = (trackTitle) => {
        if(trackTitle !== '') {
            this.socket.emit('addTrack', { name: trackTitle });
        }
    };

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
                        _this.props.history.push('/');
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

    render() {
        return(
            <div>
                {this.state.loading ?
                    <div style={{flex: 1}}>
                        <div style={{height: '1000px', width: '100px', margin: '0 auto'}}>
                            <ScaleLoader
                                color={'rgba(241,104,37, 0.4)'}
                                loading={this.state.loading}
                                width={10}
                            />
                        </div>
                    </div>
                    :
                    <div className='registrationFrame'>
                        <h1> Регистрация на 23.06.2018</h1>
                        <div style={{color: 'red', lineHeight: '16px', fontSize: '13px'}}>
                                В конце дня сгорают песни с кол-вом записавшихся: 0
                        </div>
                        <div style={{color: 'red', lineHeight: '16px', fontSize: '13px'}}>
                                В конце недели сгорают песни с кол-вом записавшихся: 1
                        </div>
                        <div style={{width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center'}}
                        >
                            <img src={this.state.currentUser.photos[0].value} style={{borderRadius: '26px', margin: '5px', width: '37px', height: '37px'}}/>
                            <a style={{textDecoration: 'none', color: 'white'}} href='/logout'>Выйти</a>
                        </div>

                        <RegistrationTable currentUser = {this.state.currentUser} data={this.state.data} socket={this.socket}/>
                        <div className="offerSection">
                            <InputGroup>
                                <Input
                                    placeholder="Группа - трек"
                                    value={this.state.trackTitle}
                                    onChange={e => this.setState({trackTitle: e.target.value})}
                                />
                                <InputGroupAddon addonType="append">
                                    <Button
                                        onClick={() => this.addTrack(this.state.trackTitle)}
                                        disabled={this.state.trackTitle === ''}
                                        color="secondary"
                                    >
                                        Предложить трек
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                        <ErrorModal isOpen={this.state.isShowErrorMessage} errorMessage={this.state.errorMessage}/>
                    </div>
                }
            </div>
        )
    }
}

const RegistrationWithRouter = withRouter(Registration);

export {RegistrationWithRouter};