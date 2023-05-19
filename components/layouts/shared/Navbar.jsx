'use client';

import React, { useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoImg from '../../../assets/images/logo.png';
import profileImg from '../../../assets/images/default.png';
import Search from '../filters/Search';
import CartContext from '@/context/CartContext';
import AuthContext from '@/context/AuthContext';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const { data: session, status } = useSession();

  console.log(session);

  useEffect(() => {
    if (session) {
      setUser(session?.user);
    }
  }, [session, session?.user, user, setUser]);

  const { cart } = useContext(CartContext);
  const cartItems = cart?.cartItems;

  return (
    <header className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex-shrink-0 mr-5">
            <a href="/">
              <Image src={logoImg.src} height="40" width="120" alt="BuyItNow" />
            </a>
          </div>
          <Search />

          <div className="flex items-center space-x-2 ml-auto">
            <Link
              href="/cart"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
              <span className="hidden lg:inline ml-1">
                Cart (<b>{cartItems?.length || 0}</b>)
              </span>
            </Link>
            {!user ? (
              <Link
                href="/signin"
                className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
              >
                <i className="text-gray-400 w-5 fa fa-user"></i>
                <span className="hidden lg:inline ml-1">Sign in</span>
              </Link>
            ) : (
              <Link href="/me">
                <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user?.avatar ? user?.avatar?.url : profileImg.src}
                  />
                  <div className="space-y-1 font-medium">
                    <p>
                      {user?.name}
                      <time className="block text-sm text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </time>
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          <div className="lg:hidden ml-2">
            <button
              type="button"
              className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
            >
              <span className="sr-only">Open menu</span>
              <i className="fa fa-bars fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
