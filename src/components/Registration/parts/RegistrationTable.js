import React, {Component} from 'react'
import { TrackRow } from './TrackRow'
import {Table} from 'reactstrap'
import {types} from '../../../constants/types'

export class RegistrationTable extends Component {
    render() {
        const {data, socket} = this.props;

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
                        {
                            this.getSortedData(data, this.props.sortType)
                                .map((rowData, index)=>
                                    <TrackRow
                                        currentUser = {this.props.currentUser}
                                        key={rowData.id}
                                        socket={socket}
                                        index={index}
                                        rowData={rowData}
                                        deleteTrack={this.props.deleteTrack}
                                    />
                                )
                        }
                    </tbody>
                </Table>
            </div>
        );
    }

    getSortedData = (data, sortType) => {
      if(sortType === 'fullness') {
          return data.sort(this.compareFullness);
      }

      return data.sort(this.compareDate);
    };


    compareDate(firstTrack, secondTrack) {
        let track1 = firstTrack.id;
        let track2 = secondTrack.id;
        if (track1<track2) {
            return -1;
        }
        if (track1>track2) {
            return 1;
        }
        return 0;
    }



    compareFullness(firstTrack, secondTrack) {
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