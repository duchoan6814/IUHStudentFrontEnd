import { gql } from "@apollo/client";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  mutation: {
    createChuyenNganh: (fragment) => gql`
        mutation CREATE_CHUYENNGANH($inputs: ChuyenNganhInput!){
            createChuyenNganh(inputs:$inputs){
               status
               message
               errors{
                 message
                 error_fields
               }
               data{
                chuyenNganhId
                tenChuyenNganh
               }
             }
        }
        `
  }
}