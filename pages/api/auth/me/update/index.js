import { updateProfile } from '@/backend/controllers/authController';
import { isAuthenticatedUser } from '@/backend/middlewares/auth';
import ErrorHandlingChecker from '@/backend/middlewares/errors';
import { connectToDB } from '@/backend/utils/dbConnection';
import upload from '@/backend/utils/multerFile';
import nc from 'next-connect';

const uploadMiddleware = upload.array('image');

// export default async function handler(req, res) {
//   if (req.method === 'PUT') {
//     await connectToDB();
//     await isAuthenticatedUser(req, res, () => {
//       uploadMiddleware();
//       updateProfile(req, res);
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

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.use(isAuthenticatedUser, uploadMiddleware).put(updateProfile);

export default handler;
