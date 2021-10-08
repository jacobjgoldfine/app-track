const { Application, User } = require('../models');
const {AuthenticationError} = require("apollo-server-express");
const {signToken} = require('../utils/auth')

const resolvers = {
  Query: {
    getAllApplications: async () => {
      return Application.find();
    },

    getUser: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      return User.create({ firstName, lastName, email, password });
    },
    
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    // removeProfile: async (parent, { profileId }) => {
    //   return Profile.findOneAndDelete({ _id: profileId });
    // },
    // removeSkill: async (parent, { profileId, skill }) => {
    //   return Profile.findOneAndUpdate(
    //     { _id: profileId },
    //     { $pull: { skills: skill } },
    //     { new: true }
    //   );
    // },
  },
};

module.exports = resolvers;
