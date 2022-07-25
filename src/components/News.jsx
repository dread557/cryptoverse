import React, { useState } from 'react'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'

import moment from 'moment'
import Loader from './Loader'
import './News.css'

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('cryptocurrency')
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 })
    const { data } = useGetCryptosQuery(100)

    if (isFetching) return <Loader />
    return (
        <div className='news-container'>
            {!simplified && (
                <div className='search-crypto'>
                    <form>
                        <select
                            placeholder='Select a crypto'
                            value={newsCategory}
                            onChange={(e) => setNewsCategory(e.target.value)}
                        >
                            <option>cryptocurrency</option>
                            {data?.data?.coins.map((coin) => (<option value={coin.name}>{coin.name}</option>))}
                        </select>
                    </form>

                </div>
            )}
            <div className='latest-news'>
                <div className='news-list'>
                    {cryptoNews?.value?.map((news) => (
                        <div className='news-card'>
                            <span className='news-card-header'>
                                <p>{news.name}</p>
                                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt='' />
                            </span>
                            <p>{news.description > 100 ? ` ${news.description.substring(0, 100)}` : news.description}</p>
                            <span className='card-footer'>
                                <span>
                                    <img src={news.provider[0].image?.thumbnail?.contentUrl} alt='' />
                                    <p>{news.provider[0].name}</p>
                                </span>
                                <p>{moment(news.datePublished).startOf('ss').fromNow()}</p>
                            </span>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default News