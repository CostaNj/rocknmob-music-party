import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import './enter.css'
import {Button} from 'reactstrap'
import {Loader} from '../Loader'
import axios from 'axios'

class Enter extends Component{

    constructor() {
        super();

        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        this.getSessionUserId();
    }

    render() {
             return(
            <div style={{width: '100%'}}>
                {this.state.loading ?
                    <Loader loading={this.state.loading}/>
                    :
                    <div className='loginFrame'>
                        <div className="rules">
                            <h3> ПРАВИЛА УЧАСТИЯ </h3>
                            <p>
                                Прежде чем зарегистрироваться на мероприятие, необходимо обязательно ознакомиться с
                                <a target="_blank" href="https://vk.com/page-157371213_52902223"> правилами участия </a>!
                            </p>
                        </div>
                        <a href='/auth/vk'>
                            <Button color="secondary">
                                Войти через VK
                            </Button>
                        </a>
                    </div>
                }
            </div>
        )
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
                        _this.setState({
                            loading: false
                        });
                    } else {
                        _this.props.history.push('/jam/registration');
                    }
                })
                .catch(function (error) {
                    //console.log(error);
                });
        }, 2000);
    }

}
const EnterWithRouter = withRouter(Enter);

export {EnterWithRouter};