import {
  getAddress,
  updateAddress,
  deleteAddress,
} from '@/backend/controllers/addressController';
import { isAuthenticatedUser } from '@/backend/middlewares/auth';
import ErrorHandlingChecker from '@/backend/middlewares/errors';
import { connectToDB } from '@/backend/utils/dbConnection';
import nc from 'next-connect';

// export default async function handler(req, res) {
//   await connectToDB();
//   if (req.method === 'GET') {
//     await getAddress(req, res);
//   } else if (req.method === 'PUT') {
//     await updateAddress(req, res);
//   } else if (req.method === 'DELETE') {
//     await deleteAddress(req, res);
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

handler.use(isAuthenticatedUser).get(getAddress);
handler.use(isAuthenticatedUser).put(updateAddress);
handler.use(isAuthenticatedUser).delete(deleteAddress);

export default handler;
