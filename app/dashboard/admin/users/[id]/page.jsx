import axios from 'axios';
import React from 'react';
import { cookies } from 'next/headers';
import { UpdateUser } from '@/components';

const getUser = async (id) => {
  const nextCookies = cookies();

  const nextAuthSessionToken = nextCookies.get('next-auth.session-token');

  const { data } = await axios.get(
    `${process.env.API_URL}/api/v1/admin/user/${id}`,
    {
      headers: {
        Cookie: `next-auth.session-token=${nextAuthSessionToken?.value}`,
      },
    }
  );

  return data?.data;
};

const Page = async ({ params }) => {
  const data = await getUser(params?.id);

  return <UpdateUser user={data?.user} />;
};

export default Page;
