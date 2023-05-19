'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import AuthContext from '@/context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <figure className="flex items-start sm:items-center">
        <div className="relative">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={user?.avatar ? user?.avatar?.url : '/images/default.png'}
            alt={user?.name}
          />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg">{user?.name}</h5>
          <p>
            <b>Email:</b> {user?.email} | <b>Joined On:</b>
            {user?.createdAt}
          </p>
        </figcaption>
      </figure>

      <hr className="my-4" />

      <Link href="/address/new">
        <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
          Add new address
        </button>
      </Link>

      <hr className="my-4" />
    </>
  );
};

export default Profile;
