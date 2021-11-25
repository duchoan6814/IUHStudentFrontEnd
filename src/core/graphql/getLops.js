import { gql } from "@apollo/client";

export default {
    query: {
        getLops: (fragment) => gql`
        query GET_LOPS {
            getLops{
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