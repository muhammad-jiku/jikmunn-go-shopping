'use client';

import React, { useEffect, useRef, useState } from 'react';
import StarRatings from 'react-star-ratings';
import { BsCart } from 'react-icons/bs';
import BreadCrumbs from './BreadCrumbs';
import axios from 'axios';
import productImg from '../../assets/images/default_product.png';

const ProductDetails = ({ params }) => {
	const [productData, setProductData] = useState([]);

	const getProductDetails = async (id) => {
		// const { data } = await axios.get(`${process.env.API_URL}/api/v1/products/${id}`);
		const { data } = await axios.get(`/api/v1/products/${id}`);
		// console.log('data', data?.data);
		setProductData(data?.data);
		return data?.data;
	};

	useEffect(() => {
		getProductDetails(params?.id);
	}, [params?.id]);
	// console.log('product data', productData);

	const imgRef = useRef(null);

	const setImgPreview = (url) => {
		imgRef.current.src = url;
	};

	const inStock = productData?.stock >= 10;

	const breadCrumbs = [
		{ name: 'Home', url: '/' },
		{
			name: `${productData?.name?.substring(0, 100)} ...`,
			url: `/products/${productData?._id}`,
		},
	];

	return (
		<>
			<BreadCrumbs breadCrumbs={breadCrumbs} />
			<section className='bg-white py-10'>
				<div className='container max-w-screen-xl mx-auto px-4'>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5'>
						<aside>
							<div className='border border-gray-200 shadow-sm p-3 text-center rounded mb-5'>
								<img
									ref={imgRef}
									className='object-cover inline-block'
									src={
										productData?.images?.[0]
											? productData?.images?.[0]?.url
											: productImg.src
									}
									alt='Product title'
									width='340'
									height='340'
								/>
							</div>
							<div className='space-x-2 overflow-auto text-center whitespace-nowrap'>
								{productData?.images?.map((img, index) => (
									<a
										key={index}
										className='inline-block border border-gray-200 p-1 rounded-md hover:border-blue-500 cursor-pointer'
										onClick={() => setImgPreview(img?.url)}
									>
										<img
											className='w-14 h-14'
											src={img.url}
											alt='Product title'
											width='500'
											height='500'
										/>
									</a>
								))}
							</div>
						</aside>
						<main>
							<h2 className='font-semibold text-2xl mb-4'>
								{productData?.name}
							</h2>

							<div className='flex flex-wrap items-center space-x-2 mb-2'>
								<div className='ratings'>
									<StarRatings
										rating={productData?.ratings}
										starRatedColor='#ffb829'
										numberOfStars={5}
										starDimension='20px'
										starSpacing='2px'
										name='rating'
									/>
								</div>
								<span className='text-yellow-500'>{productData?.ratings}</span>

								<svg
									width='6px'
									height='6px'
									viewBox='0 0 6 6'
									xmlns='http://www.w3.org/2000/svg'
								>
									<circle
										cx='3'
										cy='3'
										r='3'
										fill='#DBDBDB'
									/>
								</svg>

								<span className='text-green-500'>Verified</span>
							</div>

							<p className='mb-4 font-semibold text-xl'>
								${productData?.price}
							</p>

							<p className='mb-4 text-gray-500'>{productData?.description}</p>

							<div className='flex flex-wrap gap-2 mb-5'>
								<button
									className='px-4 py-2 flex justify-around items-center text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700'
									disabled={inStock ? false : true}
								>
									<BsCart className='text-2xl' />
									<span className='ml-1'> Add to cart</span>
								</button>
							</div>

							<ul className='mb-5'>
								<li className='mb-1'>
									{' '}
									<b className='font-medium w-36 inline-block'>Stock</b>
									{inStock ? (
										<span className='text-green-500'>In Stock</span>
									) : (
										<span className='text-red-500'>Out of Stock</span>
									)}
								</li>
								<li className='mb-1'>
									{' '}
									<b className='font-medium w-36 inline-block'>Category:</b>
									<span className='text-gray-500'>{productData?.category}</span>
								</li>
								<li className='mb-1'>
									{' '}
									<b className='font-medium w-36 inline-block'>
										Seller / Brand:
									</b>
									<span className='text-gray-500'>{productData?.seller}</span>
								</li>
							</ul>
						</main>
					</div>

					{/* <NewReview /> */}
					<hr />

					<div className='font-semibold'>
						<h1 className='text-gray-500 review-title mb-6 mt-10 text-2xl'>
							Other Customers Reviews
						</h1>
						{/* <Reviews /> */}
					</div>
				</div>
			</section>
		</>
	);
};

export default ProductDetails;
