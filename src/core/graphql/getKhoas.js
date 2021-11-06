import { gql } from "@apollo/client";

export default {
    query: {
        getKhoas: (fragment) => gql`
        query GET_KHOAS {
            getKhoas{
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