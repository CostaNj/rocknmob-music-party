import React, { PureComponent} from 'react'

export class UserCell extends PureComponent {
    render() {
        const {userInfo, reserved} = this.props;
        let url = userInfo && userInfo.uid ? `https://vk.com/id${userInfo.uid}` : 'unknown';
        return (
            <td onClick={this.click} className={reserved ? "reservedCell" : "unreservedCell"}>
                {reserved ? <a href={url} target="_blank">{userInfo && userInfo.fio}</a> : 'Записаться'}
            </td>
        );
    }

    click = () => {
        const {socket, reserved, trackId, type, userInfo } = this.props;
        let myId = 124;
        reserved ?
            console.log('deleteParticipation') :
            socket.emit('takePart', {partytrackId: trackId, type, partyuserId: myId});
    }

}