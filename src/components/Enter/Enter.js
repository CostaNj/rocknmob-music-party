import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import './enter.css'

class Enter extends Component{

    componentWillMount() {
        if(this.getCookie('authorizedVk') === 'true') {
            this.props.history.push('/registration');
        }
    }

    render() {
        console.log(this.props);
        return(
            <div>
                <div className='loginFrame'>
                    <div className="rules">
                        <h3> ПРАВИЛА УЧАСТИЯ </h3>
                        <ol>
                            <li>Вести себя уважительно по отношению ко всем присутствующим на мероприятии;</li>
                            <li>Бережно относиться к чужому имуществу</li>
                            <li>Участвовать можно <span className="importantText">максимум в 3 треках</span>. Организаторы оставляют за собой право в случайном
                                порядке сокращать количество песен до максимально допустимого для тех участников, кто нарушил это правило;</li>
                            <li>В случае, если участники песни не вышли на сцену в течение <span className="importantText">3 минут</span> после того, как она
                                была объявлена, данная песня автоматически переносится в конец сетлиста и исполняется по остаточному принципу;</li>
                            <li>Выходить на сцену необходимо с <span className="importantText">настроенным </span>инструментом;</li>
                        </ol>
                        <h4> ЗАПРЕЩЕНО</h4>
                        <ol>
                            <li>Играть более 1 песни одним и тем же составом (должны поменяться не менее двух музыкантов);</li>
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
                        <h5> За любое нарушение правил к участнику будут применены санкции на усмотрение организаторов </h5>
                    </div>
                    <button onClick={this.logIn}>Go to registration</button>

                </div>
            </div>
        )
    }

    // возвращает cookie с именем name, если есть, если нет, то undefined
    getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    logIn = () => {
        var date = new Date(new Date().getTime() + 60 * 1000);
        document.cookie = "authorizedVk=true; path=/; expires=" + date.toUTCString();
        this.props.history.push('/registration')
    }

}
const EnterWithRouter = withRouter(Enter);

export {EnterWithRouter};