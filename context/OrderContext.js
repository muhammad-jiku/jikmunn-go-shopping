'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);

  const router = useRouter();

  const updateOrder = async (id, orderData) => {
    try {
      const { data } = await axios.put(
        // `${process.env.API_URL}/api/v1/admin/order/${id}`,
        `/api/v1/admin/order/${id}`,
        orderData
      );

      console.log('updated order ', data);

      if (data.success) {
        setUpdated(true);
        router.replace(`/dashboard/admin/orders/${id}`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const { data } = await axios.delete(
        // `${process.env.API_URL}/api/v1/admin/order/${id}`,
        `/api/v1/admin/order/${id}`
      );

      if (data?.success) {
        router.replace(`/dashboard/admin/orders`);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <OrderContext.Provider
      value={{
        error,
        updated,
        setUpdated,
        updateOrder,
        deleteOrder,
        clearErrors,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
