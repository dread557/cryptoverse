import React from 'react'
import millify from 'millify'

import Loader from './Loader'
import './Homepage.css'

import { useGetCryptosQuery } from '../services/cryptoApi'
import Cryptocurrencies from './Cryptocurrencies'
import News from './News'
import { Link } from 'react-router-dom'

const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(10)
    const globalSats = data?.data?.stats
    if (isFetching) return <Loader />

    return (
        <div className='container'>
            <h1>Global Crypto Stats</h1>
            <div className='general-stats'>
                <span className='general-stats-val'>
                    <p>Total Cryptocurrencies</p>
                    <p>{millify(globalSats.total)}</p>
                </span>
                <span className='general-stats-val'>
                    <p>Total Exchanges</p>
                    <p>{millify(globalSats.totalExchanges)}</p>
                </span>
                <span className='general-stats-val'>
                    <p>Total Marketcap</p>
                    <p>{millify(globalSats.totalMarketCap)}</p>
                </span>
                <span className='general-stats-val'>
                    <p>Total 24hr Volume</p>
                    <p>{millify(globalSats.total24hVolume)}</p>
                </span>
                <span className='general-stats-val'>
                    <p>Total Markets</p>
                    <p>{millify(globalSats.totalMarkets)}</p>
                </span>
            </div>
            <div className='top-ten-crypto'>
                <span className='top-ten-crypto-header'>
                    <h1>Top 10 Cryptocurrencies in the world</h1>
                    <Link to='/cryptocurrencies'><button className='show-btn'>Show more</button></Link>
                </span>
                <Cryptocurrencies simplified />
            </div>
            <div className='latest-news'>
                <span className='latest-header'>
                    <h1>Latest Crypto News</h1>
                    <Link to='/news'><button className='show-btn'>Show more</button></Link>
                </span>
                <News simplified />
            </div>
        </div>
    )
}

export default Homepage