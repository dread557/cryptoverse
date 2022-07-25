import React, { useState, useEffect } from 'react'
import { useGetCryptosQuery } from '../services/cryptoApi'
import millify from 'millify'

import Loader from './Loader'
import './Cryptocurrencies.css'
import { Link } from 'react-router-dom'

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100
    const { data: cryptoList, isFetching } = useGetCryptosQuery(count)
    const [cryptos, setCryptos] = useState(cryptoList?.data?.coins)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const filteredData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCryptos(filteredData)
    }, [searchTerm, cryptoList])

    if (isFetching) return <Loader />
    return (
        <div className='cryptocurrencies-container'>
            {!simplified && (
                <div className='search-crypto'>
                    <input type='text' placeholder='Search crypto' onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            )}
            <div className='crypto-list'>
                {cryptos?.map((crypto) => (
                    <Link to={`/crypto/${crypto.uuid}`}>
                        <div className='crypto-card' key={crypto.id}>
                            <span className='crypto-card-header'>
                                <p>{crypto.rank}. {crypto.name}</p>
                                <img className='card-img' src={crypto.iconUrl} alt={crypto.name} />
                            </span>
                            <div className='crypto-card-details'>
                                <p>Price : {millify(crypto.price)}</p>
                                <p>Marketcap : {millify(crypto.marketCap)}</p>
                                <p>Daily Change: {millify(crypto.change)}</p>
                            </div>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    )
}

export default Cryptocurrencies