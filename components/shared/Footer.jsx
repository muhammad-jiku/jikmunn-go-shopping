'use client';

import React from 'react';

export default function Footer() {
	const year = new Date().getFullYear();
	return (
		<footer className='flex h-10 justify-center items-center shadow-inner'>
			<p>Copyright ©{year} Go Shopping Authority</p>
		</footer>
	);
}
