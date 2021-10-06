const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    applications: [Application]
  }

  type Application {
    _id: ID
    jobTitle: String!
    companyName: String!
    date_submitted: Date
    salary: Number
    location: String
  }
  type Query {
 
  }

  type Mutation {
  
  }
`;

module.exports = typeDefs;
