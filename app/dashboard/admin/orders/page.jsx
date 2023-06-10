import axios from 'axios';
import React from 'react';

import { cookies } from 'next/headers';
import queryString from 'query-string';
import { AllOrders } from '@/components';

const getOrders = async (searchParams) => {
  const nextCookies = cookies();

  const nextAuthSessionToken = nextCookies.get('next-auth.session-token');

  const urlParams = {
    page: searchParams.page || 1,
  };

  const searchQuery = queryString.stringify(urlParams);

  const { data } = await axios.get(
    `${process.env.API_URL}/api/v1/admin/order?${searchQuery}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );

  return data;
};

const Page = async ({ searchParams }) => {
  const orders = await getOrders(searchParams);

  return <AllOrders orders={orders} />;
};

export default Page;
