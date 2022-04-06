import React from 'react'
import get from 'lodash/get'
import {TrackRow} from './TrackRow'
import {Table} from 'reactstrap'
import { getTypes } from '../../../constants/types'

export const RegistrationTable = ({data, deleteAllTracks, partyType, sortType, currentUser, deleteTrack, view}) => {

  const types = getTypes(partyType)

  const getSortedData = (data, types) => {

    if (sortType === 'setlist') {
      return getSortedAndFilteredData(data, types)
    }
    if (sortType === 'fullness') {
      return data.sort(compareFullness)
    }

    return data.sort(compareDate)
  }


  const compareDate = (firstTrack, secondTrack) => {
    let track1 = firstTrack.id
    let track2 = secondTrack.id
    if (track1 < track2) {
      return -1
    }
    if (track1 > track2) {
      return 1
    }
    return 0
  }


  const compareFullness = (firstTrack, secondTrack) => {
    let track1 = firstTrack.participations.length
    let track2 = secondTrack.participations.length
    if (track1 > track2) {
      return -1
    }
    if (track1 < track2) {
      return 1
    }
    return 0
  }

  const getSortedAndFilteredData = (data, types) => {
    return data.filter(
      (rowData) => {
        let isDrummerExist = false
        let isEvenOneVocalExist = false
        let isEvenOneGuitarExist = false
        let isBassExist = false

        rowData.participations.forEach((participation) => {
          let currentParticipationType = get(participation, 'type', -1)
          if (currentParticipationType === types[0].typeNumber || currentParticipationType === types[1].typeNumber) {
            isEvenOneVocalExist = true
          }
          if (currentParticipationType === types[2].typeNumber || currentParticipationType === types[3].typeNumber) {
            isEvenOneGuitarExist = true
          }
          if (currentParticipationType === types[4].typeNumber) {
            isBassExist = true
          }
          if (currentParticipationType === types[5].typeNumber) {
            isDrummerExist = true
          }
        })
        return isEvenOneVocalExist && isEvenOneGuitarExist && isBassExist && isDrummerExist
      }
    )
  }

  return (
    <div className="tableResponsiveStyle">
      <Table responsive>
        <thead>
        <tr>
          <th onClick={deleteAllTracks}>#</th>
          <th className="headerTable">Трек</th>
          {types.map((type) => <th key={`${type.typeRole}_headerTable`} className="headerTable">{type.typeHeader}</th>)}
        </tr>
        </thead>
        <tbody>
        {
          getSortedData(data, types)
            .map((rowData, index) =>
              <TrackRow
                currentUser={currentUser}
                key={rowData.id}
                index={index}
                rowData={rowData}
                deleteTrack={deleteTrack}
                types={types}
                sortType={sortType}
                view={view}
              />
            )
        }
        </tbody>
      </Table>
    </div>
  )
}