import React, {Component} from 'react'
import { TrackRow } from './TrackRow'
import {Table} from 'reactstrap'
import {types} from '../../../constants/types'

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
                            {types.map((type)=> <th key={`${type.typeRole}_headerTable`} className="headerTable">{type.typeHeader}</th>)}
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