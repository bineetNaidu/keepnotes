import fs from 'fs';
import path from 'path';
import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { getTokenPayload } from './utils';

const prisma = new PrismaClient();

const resolvers = {};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
  context: ({ req }) => ({
    ...req,
    prisma,
    userId: (authToken?: string) => {
      if (authToken) {
        const { userId } = getTokenPayload(authToken);
        return userId;
      }
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        if (!token) {
          throw new Error('No token found');
        }
        const { userId } = getTokenPayload(token);
        return userId;
      }
      throw new Error('Not authenticated');
    },
  }),
});

server
  .listen()
  .then(({ url }) => console.log(`🐊 Server is running on ${url}`));
