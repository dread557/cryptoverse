import React from 'react'
import { Line } from 'react-chartjs-2'
import './LineChart.css'
import millify from 'millify'

const LineChart = ({ coinName, coinHistory, currentPrice }) => {

    return (
        <>
            <div className='chart-header'>
                <h1>{coinName} Price Chart</h1>
                <span>
                    <p>{coinHistory?.data?.change} %</p>
                    <p>Current {coinName} Price : ${millify(currentPrice)}</p>
                </span>
            </div>
        </>
    )
}

export default LineChart