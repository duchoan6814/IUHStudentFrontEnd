/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
    mutation: {
        deleteMonHoc: (fragment) => gql`
        mutation DELETE_MONHOC($monHocId: ID!) {
            deleteMonHoc(monHocId: $monHocId) {
                status
                message
                errors {
                  message
                  error_fields
                }
                data {
                    monHocId
                    tenMonHoc
                    moTa
                }
              }
        }
        `
    }
}