import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import User from '@/backend/models/User';
import { connectToDB } from '@/backend/utils/dbConnection';

console.log({
  NEXTAUTH_SECRET: `${process.env.NEXTAUTH_SECRET}`,
  NEXTAUTH_URL: `${process.env.NEXTAUTH_URL}`,
  GOOGLE_CLIENT_ID: `${process.env.GOOGLE_CLIENT_ID}`,
  GOOGLE_CLIENT_SECRET: `${process.env.GOOGLE_CLIENT_SECRET}`,
});

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        console.log('credentials', credentials);
        // console.log('req', req);
        await connectToDB();

        const { email, password } = credentials;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
          throw new Error('Invalid Email or Password');
        }

        const isPasswordMatched = await bcrypt.compare(
          password,
          user?.password
        );

        if (!isPasswordMatched) {
          throw new Error('Invalid Email or Password');
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('---------------------JWT--------------------------');
      console.log('jwt callback token no.1', token);
      console.log('jwt callback user ', user);
      console.log('jwt callback account ', account);
      console.log('jwt callback profile ', profile);
      console.log('jwt callback new user', isNewUser);
      user && (token.user = user);

      console.log('jwt callback token no.2 ', token);
      console.log('jwt callback token user', token?.user);

      if (account?.provider === 'google') {
        try {
          await connectToDB();
          const existedUser = await User.findOne({ email: token?.user?.email });
          console.log('EXISTING user...', existedUser);
          existedUser && (token.user = existedUser);
        } catch (error) {
          console.log('jwt google callback error', error);
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      console.log('---------------------SESSION--------------------------');
      console.log('session callback no.1  ', session);
      console.log('session token callback ', token);
      console.log('session user callback ', user);
      // Send properties to the client, like an access_token and user id from a provider.
      // store the user id from MongoDB to session
      session.user = token?.user;
      // delete password from session
      delete session?.user?.password;

      console.log('session callback no.2 ', session);
      const sessionUser = await User.findOne({ email: session?.user?.email });
      session.user.id = sessionUser?._id.toString();
      console.log('session user', sessionUser);
      console.log('session callback no.3', session);

      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log('---------------------SIGN-IN--------------------------');
      console.log('sign in user callback  ', user);
      console.log('sign in account callback ', account);
      console.log('sign in profile callback ', profile);
      console.log('sign in email callback ', email);
      console.log('sign in credentials callback ', credentials);

      if (account.provider === 'google') {
        try {
          await connectToDB();

          // check if user already exists
          const userExists = await User.findOne({ email: profile?.email });
          console.log('EXISTING', userExists);
          // if not, create a new document and save user in MongoDB
          if (!userExists) {
            await User.create({
              email: profile?.email,
              name: profile?.name.replace(' ', '').toLowerCase(),
              avatar: {
                public_id: profile?.id,
                url: profile?.picture,
              },
            });
          }

          return true;
        } catch (error) {
          console.log('Error checking if user exists: ', error.message);
          return false;
        }
      }

      return true;
    },
  },
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
};

export default NextAuth(authOptions);
