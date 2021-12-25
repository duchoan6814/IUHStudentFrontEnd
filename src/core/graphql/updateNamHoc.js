/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
    mutation: {
        updateNamHoc: (fragment) => gql`
        mutation UPDATE_NAMHOC($inputs: NamHocInput!, $namHocId: ID!){
            updateNamHoc(
                inputs: $inputs
                namHocId: $namHocId
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