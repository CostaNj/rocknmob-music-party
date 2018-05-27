import React, {PureComponent} from 'react'
import {UserCell} from './UserCell'
import get from 'lodash/get'

const types = [
    {
        typeNumber: 0,
        typeRole: 'vocal1',
        typeHeader: 'Вокал1'
    },
    {
        typeNumber: 1,
        typeRole: 'vocal2',
        typeHeader: 'Вокал'
    },
    {
        typeNumber: 2,
        typeRole: 'guitar1',
        typeHeader: 'Гитара1'
    },
    {
        typeNumber: 3,
        typeRole: 'guitar2',
        typeHeader: 'Гитара2'
    },
    {
        typeNumber: 4,
        typeRole: 'bass',
        typeHeader: 'Басс'
    },
    {
        typeNumber: 5,
        typeRole: 'drums',
        typeHeader: 'Ударные'
    },
    {
        typeNumber: 6,
        typeRole: 'piano',
        typeHeader: 'Клавиши'
    }
];

export class TrackRow extends PureComponent {
    render() {
        const {rowData, index, socket} = this.props;
        return (
            <tr key={rowData.name+'_tr'}>
                <td>{index + 1}</td>
                <td>{rowData.name}</td>
                {types.map((type, index)=>{
                  let newCell = '';
                  rowData.partyusers.forEach((user)=>{
                      if(get(user, 'pivotType', -1) === type.typeNumber) {
                          newCell =
                              <UserCell
                                socket={socket}
                                key={`${user.id}_th`}
                                userInfo={user}
                                reserved
                                trackId={rowData.id}
                                type = {type.typeNumber}
                              />;
                      }
                  });
                  if(newCell) {
                      return newCell;
                  }
                  return (
                      <UserCell
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