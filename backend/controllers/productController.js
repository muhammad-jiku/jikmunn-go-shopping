import Product from '../models/Product';

export const newProduct = async (req, res, next) => {
	try {
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

export const getProducts = async (req, res, next) => {
	try {
		const products = await Product.find({});

		return res.status(200).json({
			success: true,
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
			res.status(404).json({
				error: 'Something went missing!',
			});
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
