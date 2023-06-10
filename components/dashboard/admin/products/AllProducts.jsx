'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import CustomPagination from '../layouts/CustomPagination';
import { toast } from 'react-toastify';
import ProductContext from '@/context/ProductContext';
import {
  BiSolidImageAlt,
  BiSolidPencil,
  BiSolidTrashAlt,
} from 'react-icons/bi';

const AllProducts = ({ data }) => {
  const { deleteProduct, error, clearErrors } = useContext(ProductContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error, clearErrors]);

  const deleteHandler = (id) => {
    deleteProduct(id);
  };

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <h1 className='text-3xl my-5 ml-4 font-bold'>
        {data?.productsCount} Products
      </h1>
      <table className='w-full text-sm text-left'>
        <thead className='text-l text-gray-700 uppercase'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Stock
            </th>
            <th scope='col' className='px-6 py-3'>
              Price
            </th>
            <th scope='col' className='px-6 py-3'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((product, index) => (
            <tr key={index} className='bg-white'>
              <td className='px-6 py-2'>{product?.name}</td>
              <td className='px-6 py-2'>{product?.stock}</td>
              <td className='px-6 py-2'>${product?.price}</td>
              <td className='px-6 py-2'>
                <div>
                  <Link
                    href={`/dashboard/admin/products/${product?._id}/upload_images`}
                    className='px-2 py-2 inline-block text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2'
                  >
                    <BiSolidImageAlt />
                  </Link>

                  <Link
                    href={`/dashboard/admin/products/${product?._id}`}
                    className='px-2 py-2 inline-block text-yellow-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer mr-2'
                  >
                    <BiSolidPencil />
                  </Link>
                  <a
                    className='px-2 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer'
                    onClick={() => deleteHandler(product?._id)}
                  >
                    <BiSolidTrashAlt />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='mb-6'>
        <CustomPagination
          resPerPage={data?.resPerPage}
          productsCount={data?.filteredProductsCount}
        />
      </div>
    </div>
  );
};

export default AllProducts;
