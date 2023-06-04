import { connectToDB } from '@/backend/config/dbConnect';
import Order from '@/backend/models/Order';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
	const user = await getToken({ req });
	if (!user) {
		return res.status(401).send('Error: signin required');
	}

	await connectToDB();
	const order = await Order.findById({ _id: req.query.id });
	if (order) {
		if (order.isPaid) {
			return res.status(400).send({ message: 'Error: order is already paid' });
		}
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			email_address: req.body.email_address,
		};
		const paidOrder = await order.save();

		return res.status(200).json({
			success: true,
			data: paidOrder,
			message: 'order paid successfully',
		});
	} else {
		res.status(404).send({ message: 'Error: order not found' });
	}
};

export default handler;
