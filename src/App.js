import React from 'react';
import { Switch, Route, Link } from 'react-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar } from './components/componentLib';


const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>

      </div>
      <div className='footer'>

      </div>
    </div>
  )
}

export default App