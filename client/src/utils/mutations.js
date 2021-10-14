import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

//This will be imported on either the job board area, or maybe the modal form
export const ADD_APPLICATION = gql`
  mutation addApplication($jobTitle: String!, $companyName: String!, $salary: String, $location: String) {
    addApplication(jobTitle: $jobTitle, companyName: $companyName, salary: $salary, location: $location) {
      _id
      jobTitle
      companyName
      date_submitted
      salary
      location
    }
  }
`;

export const ADD_APPLICATION_WITH_URL = gql`
  mutation ADD_APPLICATION_WITH_URL($URL: String!) {
    ADD_APPLICATION_WITH_URL(URL: $URL) {
      _id
      jobTitle
      companyName
      salary
      location
    }
  }
`;

export const UPDATE_CARD_LANE = gql`
  mutation updateCard($appID: String, $lane: String) {
    updateCard(appID: $appID, lane: $lane) {
      _id
      lane
    }
  }
`;
