'use client';

import React from 'react';

import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../shared/Navbar';
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }) {
	return (
		<>
			<ToastContainer
				position='bottom-center'
				limit={1}
			/>
			<div className='flex min-h-screen flex-col justify-between '>
				<Navbar />
				<main className='container m-auto mt-4 px-4'>{children}</main>
			</div>
		</>
	);
}
