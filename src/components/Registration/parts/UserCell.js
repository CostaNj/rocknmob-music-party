import React, { PureComponent} from 'react'
import get from 'lodash/get'

export class UserCell extends PureComponent {
    render() {
        const {participation} = this.props;
        let uid = get(participation, 'user.uid', '');
        let fio = get(participation, 'user.fio', '');
        return (
            <td onClick={this.click} className={participation ? "reservedCell" : "unreservedCell"}>
                {participation ? <a href={`https://vk.com/id${uid}`} target="_blank">{fio}</a> : 'Записаться'}
            </td>
        );
    }

    click = () => {
        const {socket, participation, trackId, type } = this.props;
        participation ?
            socket.emit('deleteParticipation', participation.id) :
            socket.emit('takePart', {partytrackId: trackId, type });
    }

}