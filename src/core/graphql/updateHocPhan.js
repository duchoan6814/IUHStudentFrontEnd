/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
  mutation: {
    updateHocPhan: (fragment) => gql`
        mutation UPDATE_KHOA($inputs: HocPhanInput!, $hocPhanId: ID!){
            updateHocPhan(
                inputs: $inputs
                hocPhanId: $hocPhanId
            ) {
              status
              message
              errors {
                message
                error_fields
              }
              data {
               ${fragment}
              }
            }
          }
        `
  }
}