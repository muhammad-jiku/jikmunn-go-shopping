'use client';

import React from 'react';
import axios from 'axios';
import { ListProducts } from '@/components';
import dynamic from 'next/dynamic';

const getProducts = async () => {
  const { data } = await axios.get(`${process.env.BASE_URL}/api/products`);

  return data;
};

const Home = async () => {
  const productsData = await getProducts();

  return <ListProducts data={productsData} />;
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
