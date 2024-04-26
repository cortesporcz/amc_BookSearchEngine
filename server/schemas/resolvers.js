// import the User model and the signToken function from the auth.js file in the utils folder
const { User } = require('../models');
const { signToken } = require('../utils/auth');

// resolvers variable that holds the query and mutation logic
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findbyId(context.user._id);
                return user;
            }
            throw new Error('You need to be logged in!');
        },
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('No user with this email found!');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new Error('Incorrect password!');
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, { input }, context) => {
            if (context.user) {
                throw new Error('You need to be logged in to save a book!');
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: input } },
                { new: true, runValidators: true }
            );
            return updatedUser;
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                throw new Error('You need to be logged in to remove a book!');
            }

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );
            return updatedUser;
        },
    },
};

module.exports = resolvers;