import React, { PureComponent} from 'react'

export class UserCell extends PureComponent {
    render() {
        const {userInfo, reserved } = this.props;
        let url = userInfo && userInfo.uid ? `https://vk.com/id${userInfo.uid}` : 'unknown';
        return (
            <td onClick={this.click} className={reserved ? "reservedCell" : "unreservedCell"}>
                {reserved ? <a href={url} target="_blank">{userInfo && userInfo.fio}</a> : 'Записаться'}
            </td>
        );
    }

    click = () => {
        this.props.socket.emit('register', 'click')
    }
}