'use client';

import React from 'react';
import googleLogo from '../../assets/images/google.png';
import { signIn } from 'next-auth/react';
import { parseCallbackUrl } from '@/helpers';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const SocialSignIn = () => {
  const router = useRouter();
  const params = useSearchParams();
  const callBackUrl = params.get('callbackUrl');

  const handleGoogleLogin = async () => {
    console.log('google sign in');
    try {
      const data = await signIn('google', {
        callbackUrl: callBackUrl ? parseCallbackUrl(callBackUrl) : '/',
      });

      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.ok) {
        router.push('/');
      }
    } catch (err) {
      toast.error(err?.message);
      console.log('google error => ', err);
    }
  };

  return (
    <div className='mt-2'>
      <button
        className='bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 py-2 px-4 m-2 rounded-full w-full flex justify-center items-center'
        onClick={handleGoogleLogin}
      >
        Continue with{' '}
        <img
          loading='lazy'
          className='ml-2'
          alt='google'
          src={googleLogo.src}
        />{' '}
      </button>{' '}
    </div>
  );
};

export default SocialSignIn;
