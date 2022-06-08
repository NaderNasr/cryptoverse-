import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
  'X-RapidAPI-Key': '21866997a5mshc29f5d246e523b5p1207d0jsn5e5034afb1a8'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'
const createRequest = (url) => ({
  url, headers: cryptoApiHeaders
})
export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`)
    })
  })
})

export const {useGetCryptosQuery} = cryptoApi