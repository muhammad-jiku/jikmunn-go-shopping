import { connectToDB } from '@/backend/config/dbConnect';
import Order from '@/backend/models/Order';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
	const user = await getToken({ req });
	if (!user) {
		return res.status(401).send('signin required');
	}

	if (req.method === 'POST') {
		await connectToDB();
		const newOrder = new Order({
			...req.body,
			user: user._id,
		});

		const order = await newOrder.save();

		return res.status(201).json({
			success: true,
			data: order,
		});
	} else {
		return res.status(400).send({
			message: 'Method not allowed',
		});
	}
};
export default handler;
