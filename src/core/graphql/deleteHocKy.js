/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
    mutation: {
        deleteHocKy: (fragment) => gql`
        mutation DELETE_HOCKY($hocKyId: ID!) {
            deleteHocKy(hocKyId: $hocKyId) {
                status
                message
                errors {
                  message
                  error_fields
                }
                data {
                    hocKyId
                    namBatDau
                    namKetThuc
                    moTa
                }
              }
        }
        `
    }
}