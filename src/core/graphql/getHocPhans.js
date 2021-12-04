
import { gql } from "@apollo/client";

export default {
    query: {
        getHocPhans: (fragment) => gql`
        query GET_HOCPHAN {
            getHocPhans{
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