import { uploadProductImages } from '@/backend/controllers/productController';
import {
  authorizeRoles,
  isAuthenticatedUser,
} from '@/backend/middlewares/auth';
import ErrorHandlingChecker from '@/backend/middlewares/errors';
import { connectToDB } from '@/backend/utils/dbConnection';
import upload from '@/backend/utils/multerFile';
import nc from 'next-connect';

const handler = nc({
  onError: ErrorHandlingChecker,
});

connectToDB();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array('image');

handler
  .use(uploadMiddleware, isAuthenticatedUser, authorizeRoles('admin'))
  .post(uploadProductImages);

export default handler;

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     await connectToDB();
//     await isAuthenticatedUser(req, res, () => {
//       uploadMiddleware();
//       authorizeRoles('admin');
//       updateProfile(req, res);
//     });
//   } else {
//     return res.status(405).json({
//       message: 'Method not allowed! Please try again',
//     });
//   }
// }
