'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import AuthContext from '@/context/AuthContext';
import profileImg from '../../assets/images/default_profile_avatar.png';
import { BsPlusLg } from 'react-icons/bs';
import UserAddresses from './user/UserAddresses';

const Profile = ({ addresses }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <figure className='flex items-start sm:items-center'>
        <div className='relative'>
          <img
            className='w-16 h-16 rounded-full mr-4'
            src={user?.avatar ? user?.avatar?.url : profileImg.src}
            alt={user?.name}
          />
        </div>
        <figcaption>
          <h5 className='font-semibold text-lg'>{user?.name}</h5>
          <p>
            <b>Email:</b> {user?.email} | <b>Joined On:</b>
            {String(user?.createdAt).substr(0, 10)}
          </p>
        </figcaption>
      </figure>

      <hr className='my-4' />

      <UserAddresses addresses={addresses} />

      <Link href='/me/address'>
        <button className='flex justify-around items-center px-4 py-2 text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100'>
          <BsPlusLg className='mr-1 font-extrabold' />{' '}
          <span> Add new address</span>
        </button>
      </Link>

      <hr className='my-4' />
    </>
  );
};

export default Profile;
