import { createRouter } from 'next-connect';
import dbConnect from '@/backend/config/dbConnect';
import { CheckError } from '@/backend/middlewares/errors';
import { isAuthenticatedUser } from '@/backend/middlewares/auth';
import {
  getAddress,
  updateAddress,
  deleteAddress,
} from '@/backend/controllers/addressControllers';

const router = createRouter();
dbConnect();

router.use(isAuthenticatedUser).get(getAddress);
router.use(isAuthenticatedUser).put(updateAddress);
router.use(isAuthenticatedUser).delete(deleteAddress);

// this will run if none of the above matches
router.all((req, res) => {
  res.status(405).json({
    error: 'Method not allowed',
  });
});

export default router.handler({
  onError: CheckError,
});
