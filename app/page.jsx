import { ProductLists } from '@/components';
import React from 'react';
import axios from 'axios';
import queryString from 'query-string';

const getProducts = async (searchParams) => {
  const urlParams = {
    keyword: searchParams?.keyword,
    page: searchParams?.page,
    category: searchParams?.category,
    'price[gte]': searchParams?.min,
    'price[lte]': searchParams?.max,
    'ratings[gte]': searchParams?.ratings,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/v1/products?${searchQuery}`
  );
  // const { data } = await axios.get(`/api/v1/products?${searchQuery}`);
  // console.log('data', data?.data);

  return data;
};

const Home = async ({ searchParams }) => {
  const productsData = await getProducts(searchParams);

  return <ProductLists data={productsData} />;
};

export default Home;
