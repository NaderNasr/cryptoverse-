import React, { useEffect, useState } from 'react'
import { millify } from 'millify';
import { Card, Row, Col, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoAPI'


const Currencies = ({ simplified }) => {

  const count = simplified ? 5 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    // setCryptos(cryptoList?.data?.coins)
    const filteredData = cryptoList?.data?.coins.filter((elem) => elem.name.toLowerCase().includes(searchTerm.toLowerCase()))

    setCryptos(filteredData)
  }, [cryptoList, searchTerm]);

  // console.log('cryptos', cryptos)
  if (isFetching) { return 'loading...' }
  return (
    <>
      {simplified ?
        <></> : <div className='search-crypto'>
          <Input placeholder='search crypto currency' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      }
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((crypto) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={crypto.uuid}>
            <Link to={`/crypto/${crypto.id}`} key={crypto.uuid}>
              <Card title={`${crypto.rank}. ${crypto.name}`} extra={<img className='crypto-image' src={crypto.iconUrl} alt={crypto.name}  style={{width:'50px'}}/>} hoverable>
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