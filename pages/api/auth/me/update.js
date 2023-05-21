import dbConnect from '@/backend/config/dbConnect';
import { updateProfile } from '@/backend/controllers/authControllers';
import { isAuthenticatedUser } from '@/backend/middlewares/auth';
import { CheckError } from '@/backend/middlewares/errors';
import upload from '@/backend/utils/Multer';
import { createRouter } from 'next-connect';

const router = createRouter();
dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array('image');

router.use(isAuthenticatedUser, uploadMiddleware).put(updateProfile);

// this will run if none of the above matches
router.all((req, res) => {
  res.status(405).json({
    error: 'Method not allowed',
  });
});

export default router.handler({
  onError: CheckError,
});
