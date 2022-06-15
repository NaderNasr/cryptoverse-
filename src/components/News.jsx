import React, { useState } from 'react'
import { Row, Col, Avatar, Select, Typography, Card } from 'antd'
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoAPI';
const demoImageUrl = 'https://static.news.bitcoin.com/wp-content/uploads/2022/06/pwc-btc.jpg'

const { Text, Title } = Typography
const { Option } = Select


const News = ({ simplified }) => {

  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  // const { data } = useGetCryptoNewsQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
  console.log(cryptoNews?.value)
  const { data } = useGetCryptosQuery (100)
  if (!cryptoNews?.value) return 'loading...'

  return (
    <Row gutter={[24, 24]}>
      {!simplified &&
        (
          <Col span={24}>
            <Select
              showSearch
              className='select-news'
              placeholder='Select Crypto'
              optionFilterProp='children'
              onChange={(val) => setNewsCategory(val)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              style={{width:'100%'}}
            >
              <Option value='Cryptocurrency'>
                Cryptocurrency
              </Option>
              {data?.data?.coins.map((m) => (
                <Option value={m.name}>{m.name}</Option>
              ))}
            </Select>
          </Col>
        )
      }
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={12} key={i}>
          <Card hoverable className='new-card' style={{ height: 'auto' }}>
            <a href={news.url} target='_blank' rel='noreferrer'>
              <div className='news-image-container'>
                <Title className='news-title' level={4}>
                  {news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImageUrl}
                  alt={news?.category + ' image'}
                  style={{ width: '120px', padding: '10px' }}
                />
              </div>
              <p>
                {news?.description.length > 100 ? `${news?.description.substring(0, 100)}...  Read More` : news?.description}
              </p>
              <div className='provider-container'>
                <div>
                  <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImageUrl} />
                  <Text className='provider-name'>{news?.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News