import { connectToDB } from '@/backend/config/dbConnect';
import User from '@/backend/models/User';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
	const user = await getToken({ req });
	if (!user || !user.isAdmin) {
		return res.status(401).send('admin signin required');
	}

	if (req.method === 'DELETE') {
		await connectToDB();
		const user = await User.findById({ _id: req.query.id });
		if (user) {
			if (user.email === 'admin@example.com') {
				return res.status(400).send({ message: 'Can not delete admin' });
			}
			await user.remove();

			return res.status(200).json({
				success: true,
			});
		} else {
			res.status(404).send({ message: 'User Not Found' });
		}
	} else {
		return res.status(400).send({ message: 'Method not allowed' });
	}
};

export default handler;
