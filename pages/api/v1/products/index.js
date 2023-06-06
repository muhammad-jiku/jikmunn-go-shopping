import { getProducts } from '@/backend/controllers/productController';
import { connectToDB } from '@/backend/utils/dbConnection';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		await connectToDB();
		await getProducts(req, res);
	} else {
		return res.status(405).json({
			message: 'Method not allowed! Please try again',
		});
	}
}
