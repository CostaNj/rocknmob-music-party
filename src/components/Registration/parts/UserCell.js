import React from 'react'
import get from 'lodash/get'
import { getSocket } from "../../../socket";

const UserCell = ({ participation, trackId, type, currentUser, sortInfo}) => {

    const socket = getSocket()

    const click = () => {
        if(sortInfo?.type !== 'setlist') {
            let currentCellUid = get(participation, 'user.uid', '');
            let isMyParticipation = currentUser.id.toString() === currentCellUid.toString();
            participation ?
              (isMyParticipation ? socket.emit('deleteParticipation', participation.id) : null) :
              socket.emit('takePart', {partytrackId: trackId, type});
        }
    }

    let currentCellUid = get(participation, 'user.uid', '');
    let isMyParticipation = currentUser.id.toString() === currentCellUid.toString();
    let fio = get(participation, 'user.fio', '');
    let photo = get(participation, 'user.img', '');
    return (
        <td onClick={click}
            className={participation ? (isMyParticipation ? "myReservedCell" : "reservedCell") : "unreservedCell"}>
            {participation ?
                (isMyParticipation ?
                  <div className='cellFioText'>
                      {
                          sortInfo?.type === 'setlist' ? fio :
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
                          sortInfo?.type === 'setlist' ? fio :
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