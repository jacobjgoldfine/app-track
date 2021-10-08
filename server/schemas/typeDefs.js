const { gql } = require('apollo-server-express');

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
    date_submitted: String
    salary: String
    location: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    application(applicationId: ID!): Application
    applications(email: String): [Application]
    me: User
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addApplication(jobTitle: String!, companyName: String!, salary: String, location: String): Application
  }
`;

module.exports = typeDefs;
