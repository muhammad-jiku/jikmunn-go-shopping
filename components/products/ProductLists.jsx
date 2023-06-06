'use client';

import React, { useEffect, useState } from 'react';
import Filters from './Filters';
import ProductItem from './ProductItem';
import axios from 'axios';
import CustomPagination from './CustomPagination';
import queryString from 'query-string';

const ProductLists = ({ searchParams }) => {
	const [productsData, setProductsData] = useState([]);
	const [productsDataPerPage, setProductsDataPerPage] = useState(0);
	const [productsDataCount, setProductsDataCount] = useState(0);

	// console.log(process.env.API_URL);
	const getProducts = async (searchParams) => {
		const urlParams = {
			keyword: searchParams?.keyword,
			page: searchParams?.page,
		};

		const searchQuery = queryString.stringify(urlParams);

		// const { data } = await axios.get(`${process.env.API_URL}/api/v1/products?${searchQuery}`);
		const { data } = await axios.get(`/api/v1/products?${searchQuery}`);
		// console.log('data', data?.data);
		setProductsData(data?.data);
		setProductsDataPerPage(data?.resPerPage);
		setProductsDataCount(data?.filteredProductsCount);

		return data?.data;
	};

	useEffect(() => {
		getProducts(searchParams);
	}, [searchParams]);
	console.log('products data', productsData);

	return (
		<section className='py-12'>
			<div className='container max-w-screen-xl mx-auto px-4'>
				<div className='flex flex-col md:flex-row -mx-4'>
					<Filters />

					<main className='md:w-2/3 lg:w-3/4 px-3'>
						{productsData?.map((product) => (
							<ProductItem
								key={product?._id}
								product={product}
							/>
						))}

						<CustomPagination
							resPerPage={productsDataPerPage}
							productsCount={productsDataCount}
						/>
					</main>
				</div>
			</div>
		</section>
	);
};

export default ProductLists;