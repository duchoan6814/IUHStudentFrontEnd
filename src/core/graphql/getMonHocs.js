import { gql } from "@apollo/client";

export default {
  query: {
    getMonHocs: (fragment) => gql`
        query GET_KHOAS {
          getMonHocs{
            status
            message
            errors{
              message
              error_fields
            }
               data{
                   ${fragment}
               }
             }
        }
        `
  }
}