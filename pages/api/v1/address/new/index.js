import { newAddress } from '@/backend/controllers/addressController';
import { connectToDB } from '@/backend/utils/dbConnection';
import nc from 'next-connect';

// export default async function handler(req, res) {
// 	if (req.method === 'POST') {
// 		await connectToDB();
// 		await newAddress(req, res);
// 	} else {
// 		return res.status(405).json({
// 			message: 'Method not allowed! Please try again',
// 		});
// 	}
// }

const handler = nc();

connectToDB();

handler.post(newAddress);

export default handler;
