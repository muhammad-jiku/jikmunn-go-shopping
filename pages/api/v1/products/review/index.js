import nc from 'next-connect';
import ErrorHandlingChecker from '@/backend/middlewares/errors';
import { connectToDB } from '@/backend/utils/dbConnection';
import { isAuthenticatedUser } from '@/backend/middlewares/auth';
import { createProductReview } from '@/backend/controllers/productController';

// export default async function handler(req, res) {
//   if (req.method === 'PUT') {
//     await connectToDB();
//     await isAuthenticatedUser(req, res, () => {
//        createProductReview(req, res);
//     });
//   } else {
//     return res.status(405).json({
//       message: 'Method not allowed! Please try again',
//     });
//   }
// }

const handler = nc({
  onError: ErrorHandlingChecker,
});

connectToDB();

handler.use(isAuthenticatedUser).put(createProductReview);

export default handler;
