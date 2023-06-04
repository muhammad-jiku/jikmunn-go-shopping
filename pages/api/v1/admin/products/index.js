import { connectToDB } from '@/backend/config/dbConnect';
import Product from '@/backend/models/Product';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
	const user = await getToken({
		req,
	});

	if (!user || !user.isAdmin) {
		return res.status(401).send('admin signin required');
	}

	if (req.method === 'POST') {
		await connectToDB();
		const newProduct = new Product({
			name: 'sample name',
			slug: 'sample-name-' + Math.random(),
			image: '/images/shirt1.jpg',
			price: 0,
			category: 'sample category',
			brand: 'sample brand',
			countInStock: 0,
			description: 'sample description',
			rating: 0,
			numReviews: 0,
		});

		const product = await newProduct.save();

		return res.status(200).json({
			success: true,
			data: product,
			message: 'Product created successfully',
		});
	} else {
		return res.status(400).send({
			message: 'Method not allowed',
		});
	}
};

export default handler;
