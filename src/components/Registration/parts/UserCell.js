import React, {PureComponent} from 'react'
import get from 'lodash/get'

export class UserCell extends PureComponent {
    render() {
        const {participation, currentUser} = this.props;
        let currentCellUid = get(participation, 'user.uid', '');
        let isMyParticipation = currentUser.id.toString() === currentCellUid.toString();
        let fio = get(participation, 'user.fio', '');
        return (
            <td onClick={this.click}
                className={participation ? (isMyParticipation ? "myReservedCell" : "reservedCell") : "unreservedCell"}>
                {participation ?
                    (isMyParticipation ? <div>{fio}</div> : <a href={`https://vk.com/id${currentCellUid}`} target="_blank">{fio}</a>)
                    : 'Записаться'
                }
            </td>
        );
    }

    click = () => {
        const {socket, participation, trackId, type, currentUser} = this.props;
        let currentCellUid = get(participation, 'user.uid', '');
        let isMyParticipation = currentUser.id.toString() === currentCellUid.toString();
        participation ?
            (isMyParticipation ? socket.emit('deleteParticipation', participation.id) : null) :
            socket.emit('takePart', {partytrackId: trackId, type});
    }

}