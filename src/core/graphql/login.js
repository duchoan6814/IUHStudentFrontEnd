import { gql } from "@apollo/client";

export default {
  query: {
    login: (fragment) => gql`
      query LOGIN($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          status
          errors {
            message
            error_fields
          }
          message
          data {
            ${fragment}
          }
        }
      }
    `,
  },
};
