import { gql } from "@apollo/client";

export const QUERY_ALL_APPLICATIONS = gql`
  query applications {
    applications {
      _id
      jobTitle
      lane
    }
  }
`;

export const QUERY_SINGLE_APPLICATION = gql`
  query application($applicationId: ID!) {
    application(applicationId: $applicationId) {
      _id
      jobTitle
      companyName
      salary
      location
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    User {
      _id
      firstName
      lastName
      email
    }
  }
`;
