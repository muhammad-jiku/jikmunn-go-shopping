'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import SocialSignIn from './SocialSignIn';
import { parseCallbackUrl } from '@/helpers';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const params = useSearchParams();
  const callBackUrl = params.get('callbackUrl');

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = await signIn('credentials', {
      email,
      password,
      callbackUrl: callBackUrl ? parseCallbackUrl(callBackUrl) : '/',
    });

    if (data?.error) {
      toast.error(data?.error);
    }

    if (data?.ok) {
      router.push('/');
    }
  };

  return (
    <div
      style={{ maxWidth: '480px' }}
      className='mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg'
    >
      <form onSubmit={submitHandler}>
        <h2 className='mb-5 text-2xl font-semibold'>Sign in to your account</h2>

        <div className='mb-4'>
          <label className='block mb-1'> Email </label>
          <input
            className='appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full'
            type='text'
            placeholder='Type your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-1'> Password </label>
          <input
            className='appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full'
            type='password'
            placeholder='Type your password'
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type='submit'
          className='my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700'
        >
          Sign In
        </button>
        <p className='text-center mt-2'>
          Don&apos;t have an account?{' '}
          <Link href='/sign-up' className='text-blue-500'>
            Sign Up
          </Link>
        </p>
      </form>
      <div className='divider'>OR</div>
      <div className='my-2'>
        <SocialSignIn />
      </div>
    </div>
  );
};

export default SignIn;
