import React, { useCallback } from 'react'
import get from 'lodash/get'
import { getSocket } from "../../../socket";

const UserCell = ({ participation, trackId, type, currentUser, sortType, view = 'text'}) => {

    const socket = getSocket()

    const click = useCallback(() => {
        if(sortType !== 'setlist') {
            let currentCellUid = get(participation, 'user.uid', '');
            let isMyParticipation = currentUser.id.toString() === currentCellUid.toString();
            participation ?
              (isMyParticipation ? socket.emit('deleteParticipation', participation.id) : null) :
              socket.emit('takePart', {partytrackId: trackId, type});
        }
    }, [sortType, participation, trackId, type, currentUser])

    let currentCellUid = get(participation, 'user.uid', '');
    let isMyParticipation = currentUser.id.toString() === currentCellUid.toString();
    let fio = get(participation, 'user.fio', '');
    let photo = get(participation, 'user.img', '');
    const reservedCellClass =  view === 'text' && sortType !== 'setlist' ? 'reservedCell' : ''
    const ownerCellClass = isMyParticipation ? 'myReservedCell' : reservedCellClass
    const currentCellStatusClass = participation ? ownerCellClass : "unreservedCell"

    return (
        <td onClick={click}
            className={currentCellStatusClass}>
            {participation ?
                (isMyParticipation ?
                  <div className='cellFioText'>
                      {
                          sortType === 'setlist' || view === 'text' ? fio :
                            <img
                              src={photo}
                              style={{borderRadius: '26px', margin: '5px', width: '37px', height: '37px'}}
                              alt={fio}
                              title={fio}
                            />
                      }
                  </div> :
                  <a href={`https://vk.com/id${currentCellUid}`} target="_blank">
                      {
                          sortType === 'setlist' || view === 'text' ? fio :
                            <img
                              src={photo}
                              style={{borderRadius: '26px', margin: '5px', width: '37px', height: '37px'}}
                              alt={fio}
                              title={fio}
                            />
                      }
                  </a>)
                : 'Записаться'
            }
        </td>
    );
}

export default UserCell