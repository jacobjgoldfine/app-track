const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    applications: [Application]!
  }

  type Application {
    _id: ID
    jobTitle: String!
    companyName: String!
    salary: String
    location: String
    lane: String
    user_id: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    application(applicationId: ID!): Application
    applications(user_id: ID): [Application]
    me: User
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addApplication(
      jobTitle: String!
      companyName: String!
      salary: String
      location: String
    ): Application
    ADD_APPLICATION_WITH_URL(URL: String!): Application
    updateCard(appID: String, lane: String): Application
    deleteApp(appID: String): Application
  }
`;

module.exports = typeDefs;
