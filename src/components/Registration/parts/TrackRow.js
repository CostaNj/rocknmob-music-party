import React, { useCallback } from 'react'
import UserCell from './UserCell'
import get from 'lodash/get'

export const TrackRow = ({ rowData, deleteTrack, index, types, sortType, view, currentUser }) => {

    const deleteCurrentTrack = useCallback(() => {
        deleteTrack(rowData);
    }, [deleteTrack, rowData])

    return (
        <tr key={rowData.name+'_tr'}>
            <td onClick={deleteCurrentTrack}>{index + 1}</td>
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
                      currentUser={currentUser}
                      participation={currentParticipation}
                      key={`${type.typeRole}_th`}
                      trackId={rowData.id}
                      type={type.typeNumber}
                      sortType={sortType}
                      view={view}
                  />)
            })}
        </tr>
    );
}