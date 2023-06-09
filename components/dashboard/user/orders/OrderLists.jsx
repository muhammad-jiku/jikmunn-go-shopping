'use client';

import React, { useContext, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CartContext from '@/context/CartContext';
import OrderItem from './OrderItem';
import CustomPagination from '@/components/shared/CustomPagination';

const ListOrders = ({ orders }) => {
  const { clearCart } = useContext(CartContext);

  const router = useRouter();
  const params = useSearchParams();

  const orderSuccess = params.get('order_success');

  useEffect(() => {
    if (orderSuccess === 'true') {
      clearCart();
      router.replace('/me/orders');
    }
  }, [orderSuccess, clearCart, router]);

  return (
    <>
      <h3 className='text-xl font-semibold mb-5'>Your Orders</h3>
      {orders?.orders?.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}

      <CustomPagination
        resPerPage={orders?.resPerPage}
        productsCount={orders?.ordersCount}
      />
    </>
  );
};

export default ListOrders;
