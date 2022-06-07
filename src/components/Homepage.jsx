import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import {useGetCryptosQuery} from '../services/cryptoAPI'

const { Title } = Typography



const Homepage = () => {

  const {data, isFetching} = useGetCryptosQuery()

  console.log(data)

  return (
    <>
      <Title level={2} className='heading'>
        Global Crypto Stats
      </Title>
      <Row>
        {/* span 12/24 = half the width of the screen */}
        <Col>
          <Statistic span={12} title='totla cypto curr' value='5' />
          <Statistic span={12} title='total exchange' value='5' />
          <Statistic span={12} title='totla market cap' value='5' />
          <Statistic span={12} title='totla 24h volume' value='5' />
          <Statistic span={12} title='totla markets' value='5' />
        </Col>
      </Row>
    </>
  )
}

export default Homepage