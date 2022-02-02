import React, {PureComponent} from 'react'
import UserCell from './UserCell'
import get from 'lodash/get'
import {types} from '../../../constants/types'

export class TrackRow extends PureComponent {

    deleteCurrentTrack = () => {
        const {deleteTrack, rowData} = this.props;
        deleteTrack(rowData);
    };

    render() {
        const {rowData, index } = this.props;
        return (
            <tr key={rowData.name+'_tr'}>
                <td onClick={this.deleteCurrentTrack}>{index + 1}</td>
                <td className='trackNameCell'>
                    <a href={`https://www.youtube.com/results?search_query=${rowData.name}`} target="_blank"> {rowData.name ? rowData.name : ''}</a>
                </td>
                {types.map((type, index)=>{
                  let currentParticipation = null;
                  rowData.participations.forEach((participation)=>{
                      if(get(participation, 'type', -1) === type.typeNumber) {
                          currentParticipation = participation;
                      }
                  });
                  return (
                      <UserCell
                          currentUser={this.props.currentUser}
                          participation={currentParticipation}
                          key={`${type.typeRole}_th`}
                          trackId={rowData.id}
                          type={type.typeNumber}
                      />)
                })}
            </tr>
        );
    }
}