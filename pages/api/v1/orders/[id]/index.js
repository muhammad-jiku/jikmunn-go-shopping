import { connectToDB } from '@/backend/config/dbConnect';
import Order from '@/backend/models/Order';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
	if (req.method === 'GET') {
		const user = await getToken({ req });
		if (!user) {
			return res.status(401).send('signin required');
		}

		await connectToDB();

		const order = await Order.findById({ _id: req.query.id });

		return res.status(200).json({
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
