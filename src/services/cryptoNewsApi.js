import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const cryptoNewsApiHeaders = {
  'X-BingApis-SDK': 'true',
  'X-RapidAPI-Key': process.env.REACT_APP_CRYPTO_NEWS_API,
  'X-RapidAPI-Host': process.env.REACT_APP_HOST
}

console.log('process.env', process.env.REACT_APP_HOST)

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'
const createRequest = (url) => ({
  url, headers: cryptoNewsApiHeaders
})
export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({count, newsCategory}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&Freshness=Day&count=${count}`)
    })
  })
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi;