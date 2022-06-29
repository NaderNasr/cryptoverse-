import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, Exchanges, Homepage, Currencies, News, Details } from './components/lib/componentLib';

import './App.css'


const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route exact path='/' element={<Homepage />} />
              {/* <Route exact path='/exchanges' element={<Exchanges />} /> */}
              <Route exact path='/currencies' element={<Currencies />} />
              <Route exact path='/details/:coinId' element={<Details />} />
              <Route exact path='/news' element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            CryptoVerse <br />
            All Rights Reserved
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
            <Link to='/currencies'>Currencies</Link>

          </Space>
        </div>
      </div>
    </div>
  )
}

export default App