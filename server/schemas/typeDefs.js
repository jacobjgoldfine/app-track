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
    getAllApplications: Application
    getUser(email: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): User
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): User
    addApplication(jobTitle: String!, companyName: String!, salary: String, location: String): Application
  }
`;

module.exports = typeDefs;
