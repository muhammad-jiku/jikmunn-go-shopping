import { getSession } from 'next-auth/react';
import ErrorHandler from '../utils/ErrorHandler';
// import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const isAuthenticatedUser = async (req, res, next) => {
  // const session = await getServerSession(req, res, authOptions);
  const session = await getSession({ req });

  // console.log('req =>',  session);
  // console.log('res =>', res);
  // console.log('authOptions =>', authOptions);

  if (!session) {
    return next(new ErrorHandler('Login first to access this route', 401));
  }

  req.user = session.user;

  next();
};
