import React, {PureComponent} from 'react'
import {SetlistUserCell} from './SetlistUserCell'
import get from 'lodash/get'
import {types} from '../../../constants/types'

export class SetlistTrackRow extends PureComponent {


    render() {
        const {rowData, index} = this.props;
        return (
            <tr key={rowData.name+'_tr'} style={{backgroundColor: `${index%2 === 0 ? 'rgba(0,0,0,0.5)' : 'rgba(40,40,40,0.5)'}`}}>
                <td>{index + 1}</td>
                <td className='trackNameCell'>
                    <a href={`https://www.youtube.com/results?search_query=${rowData.name}`} target="_blank"> {rowData.name ? rowData.name : ''}</a>
                </td>
                {types.map((type, index)=>{
                  let currentParticipation = null;
                  rowData.participations.forEach((participation)=>{
                      if(get(participation, 'type', -1) === type.typeNumber) {
                          currentParticipation = participation;
                      }
                  });
                  return (
                      <SetlistUserCell
                          participation={currentParticipation}
                          key={`${type.typeRole}_th`}
                      />)
                })}
            </tr>
        );
    }
}