import { createRouter } from 'next-connect';
import dbConnect from '@/backend/config/dbConnect';
import {
  getAddresses,
  newAddress,
} from '@/backend/controllers/addressControllers';
import { CheckError } from '@/backend/middlewares/errors';
import { isAuthenticatedUser } from '@/backend/middlewares/auth';

const router = createRouter();
dbConnect();

router.use(isAuthenticatedUser).get(getAddresses);
router.use(isAuthenticatedUser).post(newAddress);

// this will run if none of the above matches
router.all((req, res) => {
  res.status(405).json({
    error: 'Method not allowed',
  });
});

export default router.handler({
  onError: CheckError,
});
