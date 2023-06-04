'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Store } from '@/utils/store';
import Cookies from 'js-cookie';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DropDownLink from './DropDownLink';
import { Menu } from '@headlessui/react';
import SearchIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import Link from 'next/link';

export default function Navbar() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const { state, dispatch } = useContext(Store);
	const { cart } = state;

	const [query, setQuery] = useState('');
	const [cartItemsCount, setCartItemsCount] = useState(0);

	useEffect(() => {
		setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
	}, [cart.cartItems]);

	const logoutClickHandler = () => {
		Cookies.remove('cart');
		dispatch({ type: 'CART_RESET' });
		signOut({ callbackUrl: '/login' });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		router.push(`/search?query=${query}`);
	};

	return (
		<header>
			<nav className='flex h-12 items-center px-4 justify-between shadow-md'>
				<Link
					href='/'
					className='text-lg font-bold'
				>
					Go Shopping
				</Link>
				<form
					onSubmit={submitHandler}
					className='mx-auto  hidden  justify-center md:flex'
				>
					<input
						onChange={(e) => setQuery(e.target.value)}
						type='text'
						className='rounded-tr-none rounded-br-none p-1 text-sm   focus:ring-0'
						placeholder='Search products'
					/>
					<button
						className='rounded rounded-tl-none rounded-bl-none bg-amber-300 p-1 text-sm dark:text-black'
						type='submit'
						id='button-addon2'
					>
						<SearchIcon className='h-5 w-5'></SearchIcon>
					</button>
				</form>
				<div className='flex items-center z-10'>
					<Link
						href='/cart'
						className='p-2'
					>
						Cart
						{cartItemsCount > 0 && (
							<span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
								{cartItemsCount}
							</span>
						)}
					</Link>

					{status === 'loading' ? (
						'Loading'
					) : session?.user ? (
						<Menu
							as='div'
							className='relative inline-block'
						>
							<Menu.Button className='text-blue-600'>
								{session.user.name}
							</Menu.Button>
							<Menu.Items className='absolute right-0 w-56 origin-top-right bg-white  shadow-lg '>
								<Menu.Item>
									<DropDownLink
										className='dropdown-link'
										href='/profile'
									>
										Profile
									</DropDownLink>
								</Menu.Item>
								<Menu.Item>
									<DropDownLink
										className='dropdown-link'
										href='/order-history'
									>
										Order History
									</DropDownLink>
								</Menu.Item>
								{session.user.isAdmin && (
									<Menu.Item>
										<DropDownLink
											className='dropdown-link'
											href='/admin/dashboard'
										>
											Admin Dashboard
										</DropDownLink>
									</Menu.Item>
								)}
								<Menu.Item>
									<a
										className='dropdown-link'
										href='#'
										onClick={logoutClickHandler}
									>
										Logout
									</a>
								</Menu.Item>
							</Menu.Items>
						</Menu>
					) : (
						<Link
							href='/login'
							className='p-2'
						>
							Login
						</Link>
					)}
				</div>
			</nav>
		</header>
	);
}
