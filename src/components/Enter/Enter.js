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
                            <ol>
                                <li>Вести себя уважительно по отношению ко всем присутствующим на мероприятии;</li>
                                <li>Бережно относиться к чужому имуществу</li>
                                <li>Участвовать можно <span className="importantText">максимум в 3 треках</span>.
                                    Организаторы оставляют за собой право в случайном
                                    порядке сокращать количество песен до максимально допустимого для тех участников,
                                    кто нарушил это правило;
                                </li>
                                <li>В случае, если участники песни не вышли на сцену в течение <span
                                    className="importantText">3 минут</span> после того, как она
                                    была объявлена, данная песня автоматически переносится в конец сетлиста и
                                    исполняется по остаточному принципу;
                                </li>
                                <li>Выходить на сцену необходимо с <span className="importantText">настроенным </span>инструментом;
                                </li>
                            </ol>
                            <h4> ЗАПРЕЩЕНО</h4>
                            <ol>
                                <li>Играть более 1 песни одним и тем же составом (должны поменяться не менее двух
                                    музыкантов);
                                </li>
                                <li>Подключать на сцене своё оборудование, кроме музыкальных инструментов;</li>
                                <li>Вписывать в сетлист&nbsp;
                                    <a
                                        style={{textDecoration: 'none', cursor: 'pointer', fontWeight: 'bold'}}
                                        href='https://docs.google.com/spreadsheets/d/1In0NY6DBDEawjRV8RObMUuf4rGKcq2Insyda9Tk3Ano/edit#gid=1694328263'
                                        target="_blank"
                                    >
                                        треки с Jam Party №3
                                    </a>.
                                </li>
                            </ol>
                            <h5> За любое нарушение правил к участнику будут применены санкции на усмотрение
                                организаторов </h5>
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
                        _this.props.history.push('/jam/setlist');
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