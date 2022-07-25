import React from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'


import { Navbar, Homepage, Exchanges, Cryptocurrencies, News, Cryptodetails } from './components';

function App() {
  return (
    <div className="App">
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <div className='routes'>
          <Routes>
            <Route path='/exchanges' element={<Exchanges />} />
            <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
            <Route path='/news' element={<News />} />
            <Route path='/crypto/:coinId' element={<Cryptodetails />} />
            <Route path='/' element={<Homepage />} />
          </Routes>
        </div>
        <div className='footer'>
          <h1>Cryptoverse</h1>
          <p>All rights reserved</p>
          <div className='footer-nav'>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
            <Link to='/news'>News</Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
