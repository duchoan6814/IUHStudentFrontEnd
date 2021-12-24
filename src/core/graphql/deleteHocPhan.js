/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
    mutation: {
        deleteHocPhan: (fragment) => gql`
        mutation DELETE_HOCPHAN($hocPhanId: ID!) {
            deleteHocPhan(hocPhanId: $hocPhanId) {
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