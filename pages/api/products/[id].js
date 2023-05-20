import dbConnect from '@/backend/config/dbConnect';
import { getProduct } from '@/backend/controllers/productControllers';
import { CheckError } from '@/backend/middlewares/errors';
import { createRouter } from 'next-connect';

const router = createRouter();

dbConnect();

router.get(getProduct);

// this will run if none of the above matches
router.all((req, res) => {
  res.status(405).json({
    error: 'Method not allowed',
  });
});

export default router.handler({
  onError: CheckError,
});
