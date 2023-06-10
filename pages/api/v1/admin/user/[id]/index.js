import nc from 'next-connect';
import ErrorHandlingChecker from '@/backend/middlewares/errors';
import { connectToDB } from '@/backend/utils/dbConnection';
import {
  authorizeRoles,
  isAuthenticatedUser,
} from '@/backend/middlewares/auth';
import {
  getUser,
  updateUser,
  deleteUser,
} from '@/backend/controllers/authController';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     await connectToDB();
//     await isAuthenticatedUser(req, res, () => {
//       authorizeRoles('admin');
//       getUser(req, res);
//     });
//   } else if (req.method === 'PUT') {
//     await connectToDB();
//     await isAuthenticatedUser(req, res, () => {
//       authorizeRoles('admin');
//       updateUser(req, res);
//     });
//   } else if (req.method === 'GET') {
//     await connectToDB();
//     await isAuthenticatedUser(req, res, () => {
//       authorizeRoles('admin');
//       deleteUser(req, res);
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

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(getUser);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateUser);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteUser);

export default handler;
