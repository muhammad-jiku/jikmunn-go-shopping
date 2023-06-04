import { connectToDB } from '@/backend/config/dbConnect';
import Order from '@/backend/models/Order';
import Product from '@/backend/models/Product';
import User from '@/backend/models/User';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
	const user = await getToken({ req });
	if (!user || (user && !user.isAdmin)) {
		return res.status(401).send('signin required');
	}

	await connectToDB();

	const ordersCount = await Order.countDocuments();
	const productsCount = await Product.countDocuments();
	const usersCount = await User.countDocuments();

	const ordersPriceGroup = await Order.aggregate([
		{
			$group: {
				_id: null,
				sales: { $sum: '$totalPrice' },
			},
		},
	]);

	const ordersPrice =
		ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;

	const salesData = await Order.aggregate([
		{
			$group: {
				_id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
				totalSales: { $sum: '$totalPrice' },
			},
		},
	]);

	res.status(200).json({
		usersCount,
		productsCount,
		ordersCount,
		ordersPrice,
		data: salesData,
	});
};

export default handler;
