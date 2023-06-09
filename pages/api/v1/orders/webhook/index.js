import nc from 'next-connect';
import { webhook } from '@/backend/controllers/orderController';
import ErrorHandlingChecker from '@/backend/middlewares/errors';
import { connectToDB } from '@/backend/utils/dbConnection';

// export default async function handler(req, res) {
// 	if (req.method === 'POST') {
// 		await connectToDB();
// 		await webhook(req, res);
// 	} else {
// 		return res.status(405).json({
// 			message: 'Method not allowed! Please try again',
// 		});
// 	}
// }

const handler = nc({
  onError: ErrorHandlingChecker,
});

connectToDB();

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(webhook);

export default handler;
