import React from 'react'
import {ScaleLoader} from 'react-spinners'

export const Loader = ({loading}) => {
    return (
            <div style={{ width: '100px', margin: '0 auto', }}>
                <ScaleLoader
                    color={'rgba(241,104,37, 0.4)'}
                    loading={loading}
                    width={10}
                />
            </div>
    )
};