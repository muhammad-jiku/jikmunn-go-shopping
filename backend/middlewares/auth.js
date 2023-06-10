import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import ErrorHandler from '../utils/ErrorHandler';

const isAuthenticatedUser = async (req, res, next) => {
  const session = await getServerSession(req, res, authOptions);

  console.log('auth session middleware', session);

  if (!session) {
    return next(new ErrorHandler('Login first to access this route', 401));
  }

  console.log('req user in auth middleware', req.user);
  req.user = session?.user;
  console.log('session user in auth middleware', session.user);

  next();
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource.`
        )
      );
    }

    next();
  };
};

export { isAuthenticatedUser, authorizeRoles };
