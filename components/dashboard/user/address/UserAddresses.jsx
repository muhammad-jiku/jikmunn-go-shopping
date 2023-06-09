'use client';

import Link from 'next/link';
import React from 'react';
import { ImLocation } from 'react-icons/im';

const UserAddresses = ({ addresses }) => {
  return addresses?.map((address) => (
    <Link href={`/dashboard/user/address/${address?._id}`} key={address._id}>
      <div className='mb-5 gap-4'>
        <figure className='w-full flex align-center bg-gray-100 p-4 rounded-md cursor-pointer'>
          <div className='mr-3'>
            <span className='flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow mt-2'>
              <ImLocation />
            </span>
          </div>
          <figcaption className='text-gray-600'>
            <p>
              {address.street} <br /> {address.city}, {address.state},{' '}
              {address.zipCode}, {address.country}
              <br />
              Phone no: {address.phoneNo}
            </p>
          </figcaption>
        </figure>
      </div>
    </Link>
  ));
};

export default UserAddresses;
