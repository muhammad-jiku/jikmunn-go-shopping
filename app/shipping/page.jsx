import axios from 'axios';
import React from 'react';
import { cookies } from 'next/headers';
import { Shipping } from '@/components';

const getAddresses = async () => {
  const nextCookies = cookies();

  const nextAuthSessionToken = nextCookies.get('next-auth.session-token');

  const { data } = await axios.get(`${process.env.API_URL}/api/v1/address`, {
    headers: {
      Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
    },
  });

  return data?.data;
};

const Page = async () => {
  const addresses = await getAddresses();

  return <Shipping addresses={addresses} />;
};

export default Page;
