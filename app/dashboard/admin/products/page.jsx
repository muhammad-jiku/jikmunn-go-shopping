import React from 'react';
import axios from 'axios';

import queryString from 'query-string';
import { AllProducts } from '@/components';

const getProducts = async (searchParams) => {
  const urlParams = {
    page: searchParams.page,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/v1/products?${searchQuery}`
  );

  return data?.data;
};

const Page = async ({ searchParams }) => {
  const data = await getProducts(searchParams);

  return <AllProducts data={data} />;
};

export default Page;
