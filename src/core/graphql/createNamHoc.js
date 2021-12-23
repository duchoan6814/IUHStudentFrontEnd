import { gql } from "@apollo/client";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    mutation: {
        createNamHoc: (fragment) => gql`
        mutation CREATE_NAMHOC($intputs: NamHocInput!){
            createNamHoc(intputs:$intputs){
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