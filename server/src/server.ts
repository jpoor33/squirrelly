import express from 'express';
import cors from 'cors';
import type { Request, Response } from 'express';
import dotenv from "dotenv";
import path from 'node:path';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { typeDefs, resolvers } from './schemas/index.js';
import { expressMiddleware } from '@apollo/server/express4';
import { fileURLToPath } from 'url';
import searchRoutes from './api/search.js';

// import { authenticateToken } from './utils/auth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const startApolloServer = async () => {
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use('/graphql', expressMiddleware(server as any,
    // {
    //   context: authenticateToken as any
    // }
  ));

  app.use('/api/search', searchRoutes);
  
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      const filePath = path.resolve(__dirname, '../../client/dist/index.html');
      console.log("Serving index.html from:", filePath);
      res.sendFile(filePath, (err) => {
        if (err) {
          console.error("Failed to serve index.html:", err);
          res.status(500).send("Error serving frontend");
        }
      });
    });
  }

  app.listen(PORT, () => { 
    console.log(`API server running on port ${PORT}!`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();