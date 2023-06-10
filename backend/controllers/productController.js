import Product from '../models/Product';
import APIFilters from '../utils/ApiFilters';
import fs from 'fs';
import { cloudinary, uploads } from '../utils/cloudinaryFile';
import ErrorHandler from '../utils/ErrorHandler';

export const newProduct = async (req, res) => {
  try {
    req.body.user = req.user._id;

    const product = await Product.create(req.body);

    return res.status(201).json({
      success: true,
      data: product,
      message: 'Product added successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const resPerPage = 4;
    const productsCount = await Product.countDocuments();

    const apiFilters = new APIFilters(Product.find({}), req.query)
      .search()
      .filter();

    let products = await apiFilters.query;
    const filteredProductsCount = products.length;

    apiFilters.pagination(resPerPage);

    products = await apiFilters.query.clone();

    return res.status(200).json({
      success: true,
      productsCount,
      resPerPage,
      filteredProductsCount,
      data: products,
      message: 'products displayed successfully!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById({ _id: req.query.id });

    if (!product) {
      return next(new ErrorHandler('Product not found.', 404));
    }

    return res.status(200).json({
      success: true,
      data: product,
      message: 'product displayed successfully!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const uploadProductImages = async (req, res, next) => {
  try {
    let product = await Product.findById({ _id: req.query.id });

    if (!product) {
      return next(new ErrorHandler('Product not found.', 404));
    }

    const uploader = async (path) =>
      await uploads(path, 'jikmunn-go-shopping/products');

    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const imgUrl = await uploader(path);
      urls.push(imgUrl);
      fs.unlinkSync(path);
    }

    product = await Product.findByIdAndUpdate(req.query.id, {
      images: urls,
    });

    return res.status(200).json({
      success: true,
      data: urls,
      product,
      message: 'Product image uploaded successfully!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById({ _id: req.query.id });

    if (!product) {
      return next(new ErrorHandler('Product not found.', 404));
    }

    product = await Product.findByIdAndUpdate(req.query.id, req.body);

    return res.status(200).json({
      success: true,
      data: product,
      message: 'product updated successfully!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    let product = await Product.findById({ _id: req.query.id });

    if (!product) {
      return next(new ErrorHandler('Product not found.', 404));
    }

    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
      const res = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      data: product,
      message: 'product deleted successfully!',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};
