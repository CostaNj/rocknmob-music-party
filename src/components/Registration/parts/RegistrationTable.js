import React, {Component} from 'react'
import { TrackRow } from './TrackRow'
import {Table} from 'reactstrap'
export class RegistrationTable extends Component {
    render() {
        const {data, socket} = this.props;
        console.log('data type: ', typeof data);
        console.log('data: ', data);
        return (
            <div className="tableResponsiveStyle">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="headerTable">Трек</th>
                            <th className="headerTable">Вокал1</th>
                            <th className="headerTable">Вокал2</th>
                            <th className="headerTable">Гитара1</th>
                            <th className="headerTable">Гитара2</th>
                            <th className="headerTable">Бас</th>
                            <th className="headerTable">Ударные</th>
                            <th className="headerTable">Клавиши</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((rowData, index)=><TrackRow key={rowData.id} socket={socket} index={index} rowData={rowData}/>)}
                    </tbody>
                </Table>
            </div>
        );

    }
}