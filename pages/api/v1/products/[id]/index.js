import { connectToDB } from '@/backend/config/dbConnect';
import Product from '@/backend/models/Product';

const handler = async (req, res) => {
	if (req.method === 'GET') {
		await connectToDB();
		const product = await Product.findById({ _id: req.query.id });

		return res.status(200).json({
			success: true,
			data: product,
		});
	} else {
		return res.status(400).send({
			message: 'Method not allowed',
		});
	}
};

export default handler;
