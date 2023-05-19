import dbConnect from '@/backend/config/dbConnect';
import User from '@/backend/models/user';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    session: {
      strategy: 'jwt',
    },
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
    pages: {
      signIn: '/signin',
    },
    secret: process.env.NEXTAUTH_SECRET,
  });
}
