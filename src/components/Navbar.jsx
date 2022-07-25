import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons'

import icon from '../images/cryptocurrency.png'

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true)
    const [screenSize, setScreenSize] = useState(null)

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)

        window.addEventListener('resize', handleResize)

        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (screenSize <= 800) {
            setActiveMenu(false)
        } else {
            setActiveMenu(true)
        }
    }, [screenSize])
    return (
        <div className='navbar-container'>
            <div className='nav-logo-name-btn'>
                <div className='nav-logo-name'>
                    <img className='logo' src={icon} alt='logo' />
                    <Link className='name' to='/'>Cryptoverse</Link>
                </div>
                <button className='nav-menu-btn' onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></button>
            </div>
            {activeMenu && (
                <div className='nav-links'>
                    <Link to='/'>
                        <HomeOutlined />
                        Home
                    </Link>
                    <Link to='/cryptocurrencies'>
                        <MoneyCollectOutlined />
                        Cryptocurrencies
                    </Link>
                    <Link to='/exchanges'>
                        <FundOutlined />
                        Exchanges
                    </Link>
                    <Link to='/news'>
                        <BulbOutlined />
                        News
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Navbar