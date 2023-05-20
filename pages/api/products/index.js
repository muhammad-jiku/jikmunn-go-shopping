import { createRouter } from 'next-connect';
import dbConnect from '@/backend/config/dbConnect';
import {
  getProducts,
  newProduct,
} from '@/backend/controllers/productControllers';
import { CheckError } from '@/backend/middlewares/errors';

const router = createRouter();

dbConnect();

router.get(getProducts);

router.post(newProduct);

// this will run if none of the above matches
router.all((req, res) => {
  res.status(405).json({
    error: 'Method not allowed',
  });
});

export default router.handler({
  onError: CheckError,
});
