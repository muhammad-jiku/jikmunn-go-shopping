import dbConnect from '@/backend/config/dbConnect';
import User from '@/backend/models/User';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials, req) {
//         await dbConnect();

//         const { email, password } = credentials;

//         const user = await User.findOne({ email }).select('+password');

//         if (!user) {
//           throw new Error('Invalid Email or Password');
//         }

//         const isPasswordMatched = await bcrypt.compare(password, user.password);

//         if (!isPasswordMatched) {
//           throw new Error('Invalid Email or Password');
//         }

//         return user;
//       },
//     }),
//   ],
//   callbacks: {
//     jwt: async ({ token, user }) => {
//       user && (token.user = user);

//       return token;
//     },
//     session: async ({ session, token }) => {
//       session.user = token.user;

//       // delete password from session
//       delete session?.user?.password;

//       return session;
//     },
//   },
//   pages: {
//     signIn: '/signin',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: 'jwt',
//   },
// };

// export default NextAuth(authOptions);

export default async function authOptions(req, res) {
  return await NextAuth(req, res, {
    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({
        async authorize(credentials, req) {
          await dbConnect();

          const { email, password } = credentials;

          const user = await User.findOne({ email }).select('+password');

          if (!user) {
            throw new Error('Invalid Email or Password');
          }

          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordMatched) {
            throw new Error('Invalid Email or Password');
          }

          return user;
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        user && (token.user = user);

        if (req.url === '/api/auth/session?update') {
          // hit the db and eturn the updated user

          const updatedUser = await User.findById(token?.user?._id);
          token.user = updatedUser;
        }

        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user;

        // delete password from session
        delete session?.user?.password;

        return session;
      },
    },
    pages: {
      signIn: '/signin',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt',
    },
  });
}
