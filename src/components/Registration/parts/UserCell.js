import React from 'react'
import get from 'lodash/get'
import { getSocket } from "../../../socket";

const UserCell = ({ participation, trackId, type, currentUser }) => {

    const socket = getSocket()

    const click = () => {
        let currentCellUid = get(participation, 'user.uid', '');
        let isMyParticipation = currentUser.id.toString() === currentCellUid.toString();
        participation ?
          (isMyParticipation ? socket.emit('deleteParticipation', participation.id) : null) :
          socket.emit('takePart', {partytrackId: trackId, type});
    }

    let currentCellUid = get(participation, 'user.uid', '');
    let isMyParticipation = currentUser.id.toString() === currentCellUid.toString();
    let fio = get(participation, 'user.fio', '');
    return (
        <td onClick={click}
            className={participation ? (isMyParticipation ? "myReservedCell" : "reservedCell") : "unreservedCell"}>
            {participation ?
                (isMyParticipation ? <div className='cellFioText'>{fio}</div> : <a href={`https://vk.com/id${currentCellUid}`} target="_blank">{fio}</a>)
                : 'Записаться'
            }
        </td>
    );
}

export default UserCell