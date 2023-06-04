import { connectToDB } from '@/backend/config/dbConnect';
import Product from '@/backend/models/Product';

const handler = async (req, res) => {
	await connectToDB();
	const product = await Product.findById({ _id: req.query.id });

	res.status(200).json({
		success: true,
		data: product,
	});
};

export default handler;
