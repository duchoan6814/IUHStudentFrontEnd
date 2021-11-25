/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
    mutation: {
        deleteKhoa: (fragment) => gql`
        mutation DELETE_KHOA($khoaID: ID!) {
            deleteKhoa(khoaId: $khoaID) {
                status
                message
                errors {
                  message
                  error_fields
                }
                data {
                  khoaVienId
                  tenKhoaVien
                  lienKet
                }
              }
        }
        `
    }
}