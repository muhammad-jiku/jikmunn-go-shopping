import { Profile } from '@/components';
import React from 'react';
import axios from 'axios';
import { cookies } from 'next/headers';

const getAddresses = async () => {
  const nextCookies = cookies();

  const nextAuthSessionToken = nextCookies.get('next-auth.session-token');

  const { data } = await axios.get(`${process.env.API_URL}/api/v1/address`, {
    headers: {
      Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
    },
  });
  // const { data } = await axios.get(`/api/v1/address`, {
  //   headers: {
  //     Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
  //   },
  // });

  return data?.data;
};

const Page = async () => {
  const addresses = await getAddresses();

  return <Profile addresses={addresses} />;
};

export default Page;
