import { updatePassword } from '@/backend/controllers/authController';
import { isAuthenticatedUser } from '@/backend/middlewares/auth';
import ErrorHandlingChecker from '@/backend/middlewares/errors';
import { connectToDB } from '@/backend/utils/dbConnection';
import nc from 'next-connect';

// export default async function handler(req, res) {
//   if (req.method === 'PUT') {
//     await connectToDB();
//     await isAuthenticatedUser(req, res, () => {
//       updatePassword(req, res);
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

handler.use(isAuthenticatedUser).put(updatePassword);

export default handler;
