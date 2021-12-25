import { gql } from "@apollo/client";

export default {
    query: {
        getNamHoc: (fragment) => gql`
        query GET_NAMHOC {
            getNamHoc{
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