/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
  mutation: {
    updateMonHoc: (fragment) => gql`
        mutation UPDATE_KHOA($inputs: MonHocInput!, $maMonHoc: ID!){
            updateMonHoc(
                inputs: $inputs
                maMonHoc: $maMonHoc
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