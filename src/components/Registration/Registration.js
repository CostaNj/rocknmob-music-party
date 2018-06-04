import React, {Component} from 'react'
import socketIOClient from 'socket.io-client'
import { RegistrationTable, ErrorModal, DeleteTrackModal } from './parts'
import {withRouter} from 'react-router-dom'
import {InputGroup, Input, InputGroupAddon, Button} from 'reactstrap'
import './registration.css'
import axios from "axios";
import get from 'lodash/get'
import {Loader} from '../Loader'


class Registration extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            trackTitle: '',
            loading: false,
            currentUser: null,
            isShowErrorMessage: false,
            isShowDeleteDialog: false,
            deletedRowData: null,
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
            this.setState({
                isShowErrorMessage: true,
                errorMessage: errorInfo.message
            });
        });

        this.getSessionUserId();
    }

    addTrack = (trackTitle) => {
        if(trackTitle !== '') {
            this.socket.emit('addTrack', { name: trackTitle });
            this.setState({
                trackTitle: ''
            })
        }
    };

    closeErrorDialog = () => {
        this.setState({
            isShowErrorMessage: false,
            errorMessage: ''
        })
    };

    deleteTrack = (rowData) => {
        if(get(this.state, 'currentUser.admin', false)) {
            this.setState({
                isShowDeleteDialog: true,
                deletedRowData: rowData
            });
        }
    };

    deleteDialogResult = (result) => {
        result && this.state.deletedRowData && this.state.deletedRowData.id ?  this.socket.emit('deleteTrack', this.state.deletedRowData.id) : null;
        this.setState({
            isShowDeleteDialog: false,
            deletedRowData: null
        });
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
            <div style={{width: '100%'}}>
                {this.state.loading ?
                    <Loader loading={this.state.loading}/>
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

                        <RegistrationTable
                            currentUser = {this.state.currentUser}
                            data={this.state.data}
                            socket={this.socket}
                            deleteTrack = {this.deleteTrack}
                        />
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
                        <ErrorModal
                            isOpen={this.state.isShowErrorMessage}
                            errorMessage={this.state.errorMessage}
                            closeErrorDialog = {this.closeErrorDialog}
                        />
                        <DeleteTrackModal
                            isOpen={this.state.isShowDeleteDialog}
                            questionText = 'Вы действительно хотите удалить трек и всех его участников?'
                            rowData = {this.state.deletedRowData}
                            deleteDialogResult ={this.deleteDialogResult}
                        />
                    </div>
                }
            </div>
        )
    }
}

const RegistrationWithRouter = withRouter(Registration);

export {RegistrationWithRouter};