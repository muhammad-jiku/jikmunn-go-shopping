import { registerUser } from '@/backend/controllers/authController';
import { connectToDB } from '@/backend/utils/dbConnection';
import nc from 'next-connect';

// export default async function handler(req, res) {
// 	if (req.method === 'POST') {
// 		await connectToDB();
// 		await registerUser(req, res);
// 	} else {
// 		return res.status(405).json({
// 			message: 'Method not allowed! Please try again',
// 		});
// 	}
// }

const handler = nc();

connectToDB();

handler.post(registerUser);

export default handler;
