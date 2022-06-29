import React from 'react';
import { millify } from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import {Currencies, News} from '../components/lib/componentLib'
import { useGetCryptosQuery } from '../services/cryptoAPI'
import Loader from './Loader';

const { Title } = Typography



const Homepage = () => {

  const { data, isFetching } = useGetCryptosQuery(10)

  console.log(data)
  const globalStats = data?.data?.stats;
  if (isFetching) return <Loader/>

  return (
    <>
      <Title level={2} className='heading'>
        Global Crypto Stats
      </Title>
      <Row>
        {/* span 12/24 = half the width of the screen */}
        <Col style={{display:'flex', flexDirection:'row'}}>
          <Statistic span={12} title='Total Crypto currency' value={globalStats.total} style={{ padding:'45px'}}/>
          <Statistic span={12} title='Total Exchange' value={millify(globalStats.totalExchanges)} style={{ padding:'45px'}} />
          <Statistic span={12} title='Total Market Capital' value={millify(globalStats.totalMarketCap)} style={{ padding:'45px'}} />
          <Statistic span={12} title='Total 24h Volume' value={millify(globalStats.total24hVolume)} style={{ padding:'45px'}} />
          <Statistic span={12} title='Total Markets' value={millify(globalStats.totalMarkets)} style={{ padding:'45px'}} />
        </Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Top 5 Crypto Currencies of The World</Title>
        <Title level={3} className='show-more'><Link to='/currencies'>Show More</Link></Title>
      </div>
      <Currencies simplified/>

      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Latest Crypto News</Title>
        <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>
      </div>
      <News simplified/>
    </>
  )
}

export default Homepage