import { gql } from '@apollo/client';

export const QUERY_USER = gql`
query user($userId: String!) {
  user(userId: $userId) {
    _id
    username
    email
  }
}
`;

  export const QUERY_ALL_APPLICATIONS = gql `
    query getAllApplications {
      Application {
        _id
        jobTitle
        companyName
        date_submitted
        salary
        location
      }
    }
    `
  
