import { connectToDB } from '@/backend/config/dbConnect';
import Order from '@/backend/models/Order';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
	const user = await getToken({
		req,
	});
	if (!user || (user && !user.isAdmin)) {
		return res.status(401).send('Error: signin required');
	}
	await connectToDB();
	const order = await Order.findById({ _id: req.query.id });
	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();
		const deliveredOrder = await order.save();

		return res.status(200).json({
			success: true,
			data: deliveredOrder,
			message: 'Product created successfully',
		});
	} else {
		res.status(404).send({
			message: 'Error: order not found',
		});
	}
};

export default handler;
