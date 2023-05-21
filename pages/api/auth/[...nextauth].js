import dbConnect from '@/backend/config/dbConnect';
import User from '@/backend/models/user';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
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

        const isPasswordMatched = await bcrypt.compare(password, user.password);

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
};

export default NextAuth(authOptions);
