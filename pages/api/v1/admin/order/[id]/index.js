import {
  getOrder,
  updateOrder,
  deleteOrder,
} from '@/backend/controllers/orderController';
import {
  authorizeRoles,
  isAuthenticatedUser,
} from '@/backend/middlewares/auth';
import ErrorHandlingChecker from '@/backend/middlewares/errors';
import { connectToDB } from '@/backend/utils/dbConnection';
import nc from 'next-connect';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     await connectToDB();
//     await isAuthenticatedUser(req, res, () => {
//       authorizeRoles('admin');
//       getOrder(req, res);
//     });
//   } else if (req.method === 'PUT') {
//     await connectToDB();
//     await isAuthenticatedUser(req, res, () => {
//       authorizeRoles('admin');
//       updateOrder(req, res);
//     });
//   } else if (req.method === 'GET') {
//     await connectToDB();
//     await isAuthenticatedUser(req, res, () => {
//       authorizeRoles('admin');
//       deleteOrder(req, res);
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

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(getOrder);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateOrder);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteOrder);

export default handler;
