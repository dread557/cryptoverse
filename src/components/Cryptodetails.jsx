import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import HTMLReactParser from 'html-react-parser';
import millify from 'millify'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi'

import Loader from './Loader'
import './Cryptodetails.css'
import LineChart from './LineChart';

const Cryptodetails = () => {
    const { coinId } = useParams()
    const [timePeriod, setTimePeriod] = useState('7d')
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod })
    const cryptoDetails = data?.data?.coin;
    console.log({ coinHistory })

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];
    if (isFetching) return <Loader />
    return (
        <div className='crypto-detail-container'>
            <div className='cryto-detail-header'>
                <h1>{cryptoDetails.name}({cryptoDetails.symbol}) price</h1>
                <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
            </div>
            <select
                name='history'
            >
                {time.map((date) =>
                    <option
                        key={date}
                        defaultValue='7d'
                        placeholder='Select time period'
                        onChange={(value) => setTimePeriod(value)}
                    >
                        {date}
                    </option>)}
            </select>
            <LineChart coinName={cryptoDetails.name} coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} />
            <div className='crypto-detail-main'>
                <div className='other-stats-grp'>
                    <div className='other-stats-info'>
                        <div className='coin-value-statistics-heading'>
                            <h1>{cryptoDetails.name} Value Statistics</h1>
                            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
                        </div>
                        {stats.map(({ icon, title, value }) => (
                            <div className="coin-stats">
                                <span className="coin-stats-name">
                                    {icon}
                                    {title}
                                </span>
                                <p className="stats">{value}</p>
                            </div>
                        ))}
                    </div>
                    <div className="other-stats-info">
                        <div className="coin-value-statistics-heading">
                            <h1>Other Stats Info</h1>
                            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
                        </div>
                        {genericStats.map(({ icon, title, value }) => (
                            <div className="coin-stats">
                                <span className="coin-stats-name">
                                    {icon}
                                    {title}
                                </span>
                                <p className="stats">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='crypto-desc-link-grp'>
                    <div className='crypto-desc'>
                        <h1> What is {cryptoDetails.name}?</h1>
                        {HTMLReactParser(cryptoDetails.description)}
                    </div>
                    <div className='crypto-link'>
                        <h1>{cryptoDetails.name} Links</h1>
                        {cryptoDetails?.links.map((link) => (
                            <div className='links'>
                                <p>{link.type}</p>
                                <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cryptodetails