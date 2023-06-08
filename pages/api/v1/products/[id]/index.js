import { getProduct } from '@/backend/controllers/productController';
import ErrorHandlingChecker from '@/backend/middlewares/errors';
import { connectToDB } from '@/backend/utils/dbConnection';
import nc from 'next-connect';

// export default async function handler(req, res) {
// 	if (req.method === 'GET') {
// 		await connectToDB();
// 		await getProduct(req, res);
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

handler.get(getProduct);

export default handler;
