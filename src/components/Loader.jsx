import React from 'react'
import { Spin } from 'antd'

const Loader = () => {
    return (
        <div style={{
            height: '81vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Spin />
        </div>
    )
}

export default Loader 