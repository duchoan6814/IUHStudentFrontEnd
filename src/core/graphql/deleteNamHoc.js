/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
    mutation: {
        deleteNamHoc: (fragment) => gql`
        mutation DELETE_NAMHOC($namHocId: ID!) {
            deleteNamHoc(namHocId: $namHocId) {
                status
                message
                errors {
                  message
                  error_fields
                }
                data {
                    namHocId
                }
              }
        }
        `
    }
}