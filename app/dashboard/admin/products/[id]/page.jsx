import React from 'react';
import axios from 'axios';
import { UpdateProduct } from '@/components';

const getProduct = async (id) => {
  const { data } = await axios.get(
    `${process.env.API_URL}/api/v1/products/${id}`
  );

  return data?.data;
};

const Page = async ({ params }) => {
  const data = await getProduct(params.id);

  return <UpdateProduct data={data} />;
};

export default Page;
