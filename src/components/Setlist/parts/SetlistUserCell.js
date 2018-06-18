import React, {PureComponent} from 'react'
import get from 'lodash/get'

export class SetlistUserCell extends PureComponent {
    render() {
        const {participation } = this.props;
        let currentCellUid = get(participation, 'user.uid', '');
        let fio = get(participation, 'user.fio', '');
        return (
            <td>
                <a href={`https://vk.com/id${currentCellUid}`} target="_blank">{fio ? fio : '-'}</a>
            </td>
        );
    }
}