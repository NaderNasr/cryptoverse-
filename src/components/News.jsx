import React, { useState } from 'react'
import { Row, Col, Avatar, Select, Typography, Card } from 'antd'
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';


const { Text, Title } = Typography
const { Option } = Select


const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptoNewsQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

  console.log(cryptoNews)

  return (
    <div>News</div>
  )
}

export default News