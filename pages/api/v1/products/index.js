import Product from '@/backend/models/Product';
import { connectToDB } from '@/backend/config/dbConnect';

const handler = async (req, res) => {
	if (req.method === 'GET') {
		await connectToDB();
		const products = await Product.find({});

		return res.status(200).json({
			success: true,
			data: products,
		});
	} else {
		return res.status(400).send({
			message: 'Method not allowed',
		});
	}
};
export default handler;
