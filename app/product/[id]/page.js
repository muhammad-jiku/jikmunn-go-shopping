import React from 'react';
import axios from 'axios';
import { ProductDetails } from '@/components';

const getProductDetails = async (id) => {
  const { data } = await axios.get(
    `${process.env.BASE_URL}/api/products/${id}`
  );
  return data?.product;
};

const ProductDetailsPage = async ({ params }) => {
  const product = await getProductDetails(params.id);

  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
