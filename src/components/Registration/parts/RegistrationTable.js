import React, {Component} from 'react'
import { TrackRow } from './TrackRow'
import {Table} from 'reactstrap'
import {types} from '../../../constants/types'

export class RegistrationTable extends Component {
    render() {
        const {data, socket} = this.props;
        //console.log('data type: ', typeof data);
        //console.log('data: ', data);
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
                        {data
                            //.sort(this.compare)
                            .map((rowData, index)=><TrackRow currentUser = {this.props.currentUser} key={rowData.id} socket={socket} index={index} rowData={rowData}/>)}
                    </tbody>
                </Table>
            </div>
        );
    }

    compare(firstTrack, secondTrack) {
        let track1 = firstTrack.participations.length;
        let track2 = secondTrack.participations.length;
        if (track1>track2) {
            return -1;
        }
        if (track1<track2) {
            return 1;
        }
        return 0;
    }
}