import React, {PureComponent} from 'react'
import {UserCell} from './UserCell'
import get from 'lodash/get'
import {types} from '../../../constants/types'

export class TrackRow extends PureComponent {
    render() {
        const {rowData, index, socket} = this.props;
        return (
            <tr key={rowData.name+'_tr'}>
                <td>{index + 1}</td>
                <td>{rowData.name}</td>
                {types.map((type, index)=>{
                  let newUser = null;
                  rowData.participations.forEach((participation)=>{
                      if(get(participation, 'type', -1) === type.typeNumber) {
                          newUser = participation.user;
                      }
                  });
                  return (
                      <UserCell
                          userInfo={newUser}
                          reserved={!!newUser}
                          socket={socket}
                          key={`${type.typeRole}_th`}
                          trackId={rowData.id}
                          type = {type.typeNumber}
                      />)
                })}
            </tr>
        );
    }
}