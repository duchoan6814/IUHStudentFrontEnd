import { gql } from "@apollo/client";

export default {
    query: {
        getHocKys: (fragment) => gql`
        query GET_KOCKYS {
            getHocKys{
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