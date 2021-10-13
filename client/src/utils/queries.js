import { gql } from "@apollo/client";

//will go on the job board area
export const QUERY_ALL_APPLICATIONS = gql`
  query applications {
    applications {
      _id
      jobTitle
      companyName
      salary
      location
    }
  }
`;

// this will also go on the job board, not sure if we want to incldue filters for the board so you can sort ?
export const QUERY_SINGLE_APPLICATION = gql`
  query application($applicationId: ID!) {
    application(applicationId: $applicationId) {
      _id
      jobTitle
      companyName
      date_submitted
      salary
      location
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      email
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
