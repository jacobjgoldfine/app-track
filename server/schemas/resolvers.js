const { Application, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const ParseURLScrape = require("../utils/scrapAPI");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("user");
    },

    // commented out email requirements/user requirments to test
    applications: async () =>
      // parent, { email }
      {
        // const params = email ? { email } : {};
        return Application.find().populate("applications");
        // return Application.find(params).sort({ date_submitted: -1 });
      },

    application: async (parent, { applicationId }) => {
      return Application.findOne({ _id: applicationId });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("applications");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    addApplication: async (parent, { jobTitle, companyName, salary, location }, context) => {
      // if (context.user) {
      const application = await Application.create({
        jobTitle,
        companyName,
        salary,
        location,
      });

      await User.findOneAndUpdate(
        // { _id: context.user._id },
        { $addToSet: { applications: application._id } }
      );
      console.log("This works!");
      return application;

      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    ADD_APPLICATION_WITH_URL: async (parent, { URL }, context) => {
      const data = await ParseURLScrape(URL);
      console.log(data);
      const jobTitle = data.jobTitle;
      const companyName = data.companyName;
      const salary = data.salary;
      const location = data.location;

      const application = await Application.create({
        jobTitle,
        companyName,
        location,
        salary,
      });

      // await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { application: application._id } });

      return application;
    },
  },
};

module.exports = resolvers;
