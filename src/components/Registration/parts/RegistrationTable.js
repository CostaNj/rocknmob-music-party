import React, {Component} from 'react'
import get from 'lodash/get'
import { TrackRow } from './TrackRow'
import {Table} from 'reactstrap'
import { getTypes } from '../../../constants/types'

export class RegistrationTable extends Component {
    render() {
        const {data, deleteAllTracks, partyType, sortInfo } = this.props;

        const types = getTypes(partyType)
        return (
            <div className="tableResponsiveStyle">
                <Table responsive>
                    <thead>
                        <tr>
                            <th onClick={deleteAllTracks}>#</th>
                            <th className="headerTable">Трек</th>
                            {types.map((type)=> <th key={`${type.typeRole}_headerTable`} className="headerTable">{type.typeHeader}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.getSortedData(data, sortInfo, types)
                                .map((rowData, index)=>
                                    <TrackRow
                                        currentUser = {this.props.currentUser}
                                        key={rowData.id}
                                        index={index}
                                        rowData={rowData}
                                        deleteTrack={this.props.deleteTrack}
                                        types={types}
                                        sortInfo={sortInfo}
                                    />
                                )
                        }
                    </tbody>
                </Table>
            </div>
        );
    }

    getSortedData = (data, sortInfo, types) => {

        if(sortInfo.type === 'setlist') {
            return this.getSortedAndFilteredData(data, types)
        }
        if(sortInfo.type === 'fullness') {
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

    getSortedAndFilteredData = (data, types) => {
        return data.filter(
          (rowData) => {
              let isDrummerExist = false;
              let isEvenOneVocalExist = false;
              let isEvenOneGuitarExist = false;
              let isBassExist = false;

              rowData.participations.forEach((participation) => {
                  let currentParticipationType = get(participation, 'type', -1);
                  if(currentParticipationType === types[0].typeNumber || currentParticipationType === types[1].typeNumber) {
                      isEvenOneVocalExist = true;
                  }
                  if(currentParticipationType === types[2].typeNumber || currentParticipationType === types[3].typeNumber) {
                      isEvenOneGuitarExist = true;
                  }
                  if(currentParticipationType === types[4].typeNumber) {
                      isBassExist = true;
                  }
                  if (currentParticipationType === types[5].typeNumber) {
                      isDrummerExist = true;
                  }
              });
              return isEvenOneVocalExist && isEvenOneGuitarExist && isBassExist && isDrummerExist;
          }
        )
    };
}