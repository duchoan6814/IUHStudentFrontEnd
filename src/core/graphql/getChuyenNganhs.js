import { gql } from "@apollo/client";

export default {
    query: {
        getChuyenNganhs: (fragment) => gql`
        query GET_CHUYEN_NGANHS {
            getChuyenNganhs{
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