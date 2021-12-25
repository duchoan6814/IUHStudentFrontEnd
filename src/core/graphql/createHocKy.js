import { gql } from "@apollo/client";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  mutation: {
    createHocKy: (fragment) => gql`
        mutation CREATE_HOCKY($inputs: HocKyInput!){
            createHocKy(inputs:$inputs){
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