import { gql } from "@apollo/client";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  mutation: {
    createMonHoc: (fragment) => gql`
        mutation CREATE_MONHOC($inputs: MonHocInput!){
          createMonHoc(inputs:$inputs){
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