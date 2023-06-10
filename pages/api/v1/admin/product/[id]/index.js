import {
  updateProduct,
  deleteProduct,
} from '@/backend/controllers/productController';
import {
  authorizeRoles,
  isAuthenticatedUser,
} from '@/backend/middlewares/auth';
import ErrorHandlingChecker from '@/backend/middlewares/errors';
import { connectToDB } from '@/backend/utils/dbConnection';
import nc from 'next-connect';

// export default async function handler(req, res) {
//   if (req.method === 'PUT') {
//     await connectToDB();
//     await isAuthenticatedUser(req, res, () => {
//       authorizeRoles('admin');
//       updateProduct(req, res);
//     });
//   } else if (req.method === 'DELETE') {
//     await connectToDB();
//     await isAuthenticatedUser(req, res, () => {
//       authorizeRoles('admin');
//       deleteProduct(req, res);
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

handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateProduct);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteProduct);

export default handler;
