import { newProduct } from '@/backend/controllers/productController';
import { connectToDB } from '@/backend/utils/dbConnection';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		await connectToDB();
		await newProduct(req, res);
	} else {
		return res.status(405).json({
			message: 'Method not allowed! Please try again',
		});
	}
}
