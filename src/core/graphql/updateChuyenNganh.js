/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
    mutation: {
        updateChuyenNganh: (fragment) => gql`
        mutation UPDATE_KHOA($inputs: ChuyenNganhInput!, $chuyenNganhId: ID!){
            updateChuyenNganh(
                inputs: $inputs
                chuyenNganhId: $chuyenNganhId
            ) {
              status
              message
              errors {
                message
                error_fields
              }
              data {
                chuyenNganhId
                tenChuyenNganh
              }
            }
          }
        `
    }
}