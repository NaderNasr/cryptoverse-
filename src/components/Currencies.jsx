import React, { useState } from 'react'
import { millify } from 'millify';
import { Card, Row, Col, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoAPI'


const Currencies = ({ simplified }) => {

  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  // console.log('cryptos', cryptos)
  if (isFetching) { return 'loading...' }
  return (
    <>
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((crypto) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={crypto.id}>
            <Link to={`/crypto/${crypto.id}`}>
              <Card title={`${crypto.rank}. ${crypto.name}`} extra={<img className='crypto-image' src={crypto.iconUrl} alt={crypto.name} />} hoverable>
                <p>Price: {millify(crypto.price)}</p>
                <p>Market Capital: {millify(crypto.marketCap)}</p>
                <p>Daily Change: {millify(crypto.change)}%</p>

              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Currencies