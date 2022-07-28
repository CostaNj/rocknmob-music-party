import React from 'react'
import {ScaleLoader} from 'react-spinners'
import './loader.css'

export const Loader = ({loading, type = 'fullscreen'}) => {
    return (
      <div className={type === 'fullscreen' ? 'fullscreenLoader' : ''}>
        <ScaleLoader
          color={'rgba(222,13,23, 0.25)'}
          loading={loading}
          width={10}
        />
      </div>
    )
};