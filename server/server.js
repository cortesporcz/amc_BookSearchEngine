// Importing necessary modules and dependencies
import express, { urlencoded, json } from 'express';
import { join } from 'path';
import { once } from './config/connection';
import routes from './routes';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { authMiddleware } from './utils/auth';
import { typeDefs, resolvers } from './schemas';

// Creating an Express application
const app = express();

// Setting up the port for the server, defaulting to 3001
const PORT = process.env.PORT || 3001;

// Setting up the Apollo Server with provided type definitions and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Asynchronous function to start Apollo Server and configure Express
const ServerOfApollo = async () => {
  // Starting Apollo Server asynchronously before other configurations
  await server.start();

  // Configuring middleware for parsing URL-encoded and JSON data
  app.use(urlencoded({ extended: true }));
  app.use(json());

  // Configuring the main route for Apollo Server, using authMiddleware for decoding JWT tokens
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware,
  }));

  // Serving static assets and the client build in production
  if (process.env.NODE_ENV === 'production') {
    app.use((join(__dirname, '../client/dist')));

    // Handling all other routes by serving the index.html file
    app.get('*', (req, res) => {
      res.sendFile(join(__dirname, '../client/dist/index.html'));
    });
  }

  // Don't need to use these routes anymore as the app is converted from RESTful to GraphQL
  // app.use(routes);

  // Connecting to MongoDB and starting the Express server once the database is open
  once('open', () => {
    app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
  });
};

// Calling the asynchronous function to start the Apollo Server and configure Express
ServerOfApollo();