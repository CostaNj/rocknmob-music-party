import React from 'react'
import {ScaleLoader} from 'react-spinners'

export const Loader = ({loading}) => {
    return (
            <div style={{ width: '100px', margin: '0 auto', }}>
                <ScaleLoader
                    color={'rgba(241,27,27, 0.6)'}
                    loading={loading}
                    width={10}
                />
            </div>
    )
};