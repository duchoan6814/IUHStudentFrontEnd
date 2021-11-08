/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
    mutation: {
        updateKhoa: (fragment) => gql`
        mutation UPDATE_KHOA($inputs: KhoaInput!, $maKhoa: ID!){
            updateKhoa(
                inputs: $inputs
                maKhoa: $maKhoa
            ) {
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