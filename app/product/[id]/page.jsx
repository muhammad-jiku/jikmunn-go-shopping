import { ProductDetails } from '@/components';
import React from 'react';
import axios from 'axios';

const getProductDetails = async (id) => {
  const { data } = await axios.get(
    `${process.env.API_URL}/api/v1/products/${id}`
  );
  // const { data } = await axios.get(`/api/v1/products/${id}`);
  // console.log('data', data?.data);

  return data?.data;
};

const Page = async ({ params }) => {
  const product = await getProductDetails(params.id);

  return <ProductDetails product={product} />;
};

export default Page;
