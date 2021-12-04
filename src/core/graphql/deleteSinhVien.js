/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
    mutation: {
        deleteSinhVien: (fragment) => gql`
        mutation DELETE_SINHVIEN($sinhVienId: ID!) {
            deleteSinhVien(sinhVienId: $sinhVienId) {
                status
                message
                errors {
                  message
                  error_fields
                }
                data {
                    sinhVienId
                    maSinhVien
                    hoTenDem
                    ten
                }
              }
        }
        `
    }
}