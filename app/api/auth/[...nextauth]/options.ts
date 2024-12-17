import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username:", type: "text" },
        email: { label: 'Email', type: 'text', placeholder: 'example@example.com' },
        password: { label: "Password:", type: "password" },
      },
      async authorize(credentials) {
        const prisma = new PrismaClient();

        if (!credentials?.email || !credentials?.password || !credentials.username) {
          throw new Error('Name, Email and Password are required');
        }

        // Find user in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          // If user does not exist, create a new user
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const newUser = await prisma.user.create({
            data: {
              name: credentials.username,
              email: credentials.email,
              password: hashedPassword,
            },
          });
          return { id: newUser.id, email: newUser.email, name: newUser.name };
        }

        // Verify password
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error('Invalid password');

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {

      if (url === "/dashboard") {
        return url;
      }
      return baseUrl;
    },
  },
};

