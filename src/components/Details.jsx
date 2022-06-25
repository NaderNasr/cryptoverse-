import React, { useState } from 'react'
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom'
import millify from 'millify'
import { Col, Row, Typography, Select } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, ThunderboltOutlined, NumberOutlined, CheckOutlined } from '@ant-design/icons'
import { useGetCryptosDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoAPI.js'
import LineChart from './charts/LineChart'

const { Title, Text } = Typography;
const { Option } = Select;

const Details = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7 Days');
  // console.log(coinId + 'params')
  const { data, isFetching } = useGetCryptosDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });

  const cryptoDetails = data?.data?.coin;
  // console.log(data)
  const time = ['3 hours', '24 hours', '7 days', '30 days', '1 year', '3 months', '3 years', '5 years'];

  const stats = [
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: 'Symbol', value: `${cryptoDetails?.symbol}`, icon: <ThunderboltOutlined /> },
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Market Capital', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Approved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  if(isFetching) return 'Loading... '

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.name} ({data?.data?.coin.symbol}) Price
        </Title>
        <p>{cryptoDetails?.name} live price in US Dollar (USD). View value statistics, market capital and supply.</p>
      </Col>
      <Select defaultValue='7 days' placeholder='Select Time Period' className='select-timeperiod' onChange={(value) => setTimePeriod(value)} style={{ width: '100%' }}>
        {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      {/* LineChart Start */}
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />
      {/* LineChart End */}

      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails?.name} Value Statistics
            </Title>
            <p>
              Statistics Overview of {cryptoDetails?.name}
            </p>
          </Col>
          {stats.map((state, id) => (
            <Col className='coin-stats'  key={id}>
              <Col className='coin-stats-name'>
                <Text>{state?.icon}</Text>
                <Text>{state?.title}</Text>
              </Col>
              <Text className='stats'>{state?.value}</Text>
            </Col>
          ))}
        </Col>

        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails?.name} Value Statistics
            </Title>
            <p>
              Statistics Overview of {cryptoDetails?.name}
            </p>
          </Col>
          {genericStats.map((state, id) => (
            <Col className='coin-stats' key={id}>
              <Col className='coin-stats-name'>
                <Text>{state?.icon}</Text>
                <Text>{state?.title}</Text>
              </Col>
              <Text className='stats'>{state?.value}</Text>

            </Col>
          ))}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
            What is {cryptoDetails?.name}
            {/* {parse(cryptoDetails?.description)} */}
          </Title>
        </Row>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
            {cryptoDetails?.name} Links
          </Title>
          {cryptoDetails?.links.map((link) => (
            <Row className='coin-link' key={link.name}>
              <Title level={5} className='link-name'>{link.type}</Title>
              <a href={link.url} target='_blank' rel='noreferrer'>
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  )
}

export default Details