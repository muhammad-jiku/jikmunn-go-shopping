'use client';

import React, { useEffect, useState } from 'react';
import Filters from './Filters';
import ProductItem from './ProductItem';

const ProductLists = () => {
	const [productsData, setProductsData] = useState();

	const getProducts = async () => {
		const { data } = await axios.get(`${process.env.API_URL}/api/v1/products`);
		return data.data;
	};

	useEffect(() => {
		getProducts();

		setProductsData(data?.products);
	}, []);

	console.log(data);

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
					</main>
				</div>
			</div>
		</section>
	);
};

export default ProductLists;
