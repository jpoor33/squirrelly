import express from 'express';
import type { Request, Response } from 'express';
import dotenv from "dotenv";
import path from 'node:path';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
// import { authenticateToken } from './utils/auth.js';

dotenv.config();

const startApolloServer = async () => {
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  app.use('/graphql', expressMiddleware(server));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => { 
    console.log(`API server running on port ${PORT}!`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();
