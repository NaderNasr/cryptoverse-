import React, { useState } from 'react'
import { Row, Col, Avatar, Select, Typography, Card } from 'antd'
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
const demoImageUrl = 'https://static.news.bitcoin.com/wp-content/uploads/2022/06/pwc-btc.jpg'

const { Text, Title } = Typography
const { Option } = Select


const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  // const { data } = useGetCryptoNewsQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
  console.log(cryptoNews?.value)
  if (!cryptoNews?.value) return 'loading...'

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='new-card' style={{ height: 'auto' }}>
            <a href={news.url} target='_blank' rel='noreferrer'>
              <div className='news-image-container'>
                <Title className='news-title' level={4}>
                  {news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImageUrl}
                  alt={news?.category + ' image'}
                    style={{height:'120px'}}
                  />
              </div>
              <p>
                {news?.description.length > 100 ? `${news?.description.substring(0, 100)}...  Read More` : news?.description}
              </p>
              <div className='provider-container'>
                <div>
                  <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImageUrl}/>
                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                </div>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News