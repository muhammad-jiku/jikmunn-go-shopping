import axios from 'axios';
import React from 'react';

import { cookies } from 'next/headers';
import { UpdateOrder } from '@/components';

const getOrder = async (id) => {
  const nextCookies = cookies();

  const nextAuthSessionToken = nextCookies.get('next-auth.session-token');

  const { data } = await axios.get(
    `${process.env.API_URL}/api/v1/admin/order/${id}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );

  return data?.data;
};

const Page = async ({ params }) => {
  const data = await getOrder(params?.id);

  return <UpdateOrder order={data?.order} />;
};

export default Page;
