import dbConnect from '@/backend/config/dbConnect';
import { registerUser } from '@/backend/controllers/authControllers';
import { createRouter } from 'next-connect';

const router = createRouter();
dbConnect();

router.post(registerUser);

// this will run if none of the above matches
router.all((req, res) => {
  res.status(405).json({
    error: 'Method not allowed',
  });
});

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({
      error: err.message,
    });
  },
});
