import { ProductLists } from '@/components';
import React from 'react';

const Home = ({ searchParams }) => {
	return <ProductLists searchParams={searchParams} />;
};

export default Home;
