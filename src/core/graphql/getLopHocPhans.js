import { gql } from "@apollo/client";

export default {
    query: {
        getLopHocPhans: (fragment) => gql`
        query GET_LOPHOCPHAN {
            getLopHocPhans{
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