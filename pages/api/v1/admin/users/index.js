import { connectToDB } from '@/backend/config/dbConnect';
import User from '@/backend/models/User';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
	const user = await getToken({
		req,
	});

	if (!user || !user.isAdmin) {
		return res.status(401).send('admin signin required');
	}

	if (req.method === 'POST') {
		await connectToDB();
		const users = await User.find({});

		return res.status(200).json({
			success: true,
			data: users,
		});
	} else {
		return res.status(400).send({
			message: 'Method not allowed',
		});
	}
};

export default handler;
