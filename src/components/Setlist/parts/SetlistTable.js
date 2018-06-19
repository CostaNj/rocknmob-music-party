import React, {Component} from 'react'
import {SetlistTrackRow} from './SetlistTrackRow'
import {Table} from 'reactstrap'
import {types} from '../../../constants/types'
import get from 'lodash/get'

export class SetlistTable extends Component {
    render() {
        const {data} = this.props;

        return (
            <div className="tableResponsiveStyle">
                <Table responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th className="headerTable">Трек</th>
                        {types.map((type) => <th key={`${type.typeRole}_headerTable`}
                                                 className="headerTable">{type.typeHeader}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.getSortedAndFilteredData(data)
                            .map((rowData, index) =>
                                <SetlistTrackRow
                                    key={rowData.id}
                                    index={index}
                                    rowData={rowData}
                                />
                            )
                    }
                    </tbody>
                </Table>
            </div>
        );
    }

    getSortedAndFilteredData = (data) => {
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
        ).sort(this.compareDrummers);
    };

    compareDrummers(firstTrack, secondTrack) {
        let drummerFirstTrackUid = firstTrack.participations.filter(
            (participation) => participation.type === types[5].typeNumber
         )[0].user.fio.split(' ')[1];
        let drummerSecondTrackUid = secondTrack.participations.filter(
            (participation) => participation.type === types[5].typeNumber
        )[0].user.fio.split(' ')[1];

        if (drummerFirstTrackUid < drummerSecondTrackUid) {
            return -1;
        }
        if (drummerFirstTrackUid > drummerSecondTrackUid) {
            return 1;
        }
        return 0;
    }

    compareFullness(firstTrack, secondTrack) {
        let track1 = firstTrack.participations.length;
        let track2 = secondTrack.participations.length;
        if (track1 > track2) {
            return -1;
        }
        if (track1 < track2) {
            return 1;
        }
        return 0;
    }
}