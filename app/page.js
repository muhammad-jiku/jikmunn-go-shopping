import React from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { ListProducts } from '@/components';
import dynamic from 'next/dynamic';

const getProducts = async (searchParams) => {
  const urlParams = {
    keyword: searchParams.keyword,
    page: searchParams.page,
    category: searchParams.category,
    'price[gte]': searchParams.min,
    'price[lte]': searchParams.max,
    'ratings[gte]': searchParams.ratings,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.BASE_URL}/api/products?${searchQuery}`
  );

  return data;
};

const Home = async ({ searchParams }) => {
  const productsData = await getProducts(searchParams);

  return <ListProducts data={productsData} />;
};

export default Home;
// export default dynamic(() => Promise.resolve(Home), { ssr: false });
