// Importing necessary modules for JSON Web Token (JWT) and GraphQL errors
const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

//module.exports = {
  // Function for handling authentication middleware
  //authMiddleware: function ({ req }) {
    // Allows token to be sent via req.query, headers, or req.body
    //let token = req.body.token || req.query.token || req.headers.authorization;

    module.exports = {
      // function for our authenticated routes
      authMiddleware: function ({ context }, next) {
        // extract token from GraphQL context
        const token = context.token;
    
        if (!token) {
          throw new Error("You need to be logged in to do that!")
        }
      
        // verify token and get user data out of it
        try {
          const { data } = jwt.verify(token, secret, { maxAge: expiration });
          context.user = data;
        } catch {
          console.log('Invalid token');
          throw new Error("Invalid token!")
        }
    
        // send to next endpoint
        return next();
      },
    
      signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
      },
    };