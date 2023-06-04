import { connectToDB } from '@/backend/config/dbConnect';
import Order from '@/backend/models/Order';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
	const user = await getToken({ req });
	if (!user) {
		return res.status(401).send({ message: 'signin required' });
	}

	if (req.method === 'GET') {
		await connectToDB();
		const orders = await Order.find({
			user: user._id,
		});

		return res.status(200).json({
			success: true,
			data: orders,
		});
	} else {
		return res.status(400).send({
			message: 'Method not allowed',
		});
	}
};

export default handler;
