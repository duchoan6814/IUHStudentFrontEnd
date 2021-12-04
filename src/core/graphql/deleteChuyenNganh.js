/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
    mutation: {
        deleteChuyenNganh: (fragment) => gql`
        mutation DELETE_CHUYENNGANH($chuyenNganhId:ID!){
            deleteChuyenNganh(chuyenNganhId:$chuyenNganhId){
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