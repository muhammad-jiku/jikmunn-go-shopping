'use client';

import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  const newProduct = async (product) => {
    try {
      const { data } = await axios.post(
        // `${process.env.API_URL}/api/v1/admin/product/new`,
        `/api/v1/admin/product/new`,
        product
      );

      if (data) {
        router.replace('/dashboard/admin/products');
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const uploadProductImages = async (formData, id) => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        // `${process.env.API_URL}/api/v1/admin/product/upload_images/${id}`,
        `/api/v1/admin/product/upload_images/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data?.data) {
        setLoading(false);
        router.replace('/dashboard/admin/products');
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const updateProduct = async (product, id) => {
    try {
      const { data } = await axios.put(
        // `${process.env.API_URL}/api/v1/admin/product/${id}`,
        `/api/v1/admin/product/${id}`,
        product
      );

      console.log('updated product data ', data);

      if (data) {
        setUpdated(true);
        router.replace(`/dashboard/admin/products/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.delete(
        // `${process.env.API_URL}/api/v1/admin/product/${id}`,
        `/api/v1/admin/product/${id}`
      );

      if (data?.success) {
        router.replace(`/dashboard/admin/products/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <ProductContext.Provider
      value={{
        error,
        loading,
        updated,
        setUpdated,
        newProduct,
        uploadProductImages,
        updateProduct,
        deleteProduct,
        clearErrors,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
