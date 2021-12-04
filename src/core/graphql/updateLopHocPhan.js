/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
    mutation: {
        updateLopHocPhan: (fragment) => gql`
        mutation UPDATE_LOPHOCPHAN($inputs: LopHocPhanInput!, $lopHocPhanId: ID!){
            updateLopHocPhan(
                inputs: $inputs
                lopHocPhanId: $lopHocPhanId
            ) {
              status
              message
              errors {
                message
                error_fields
              }
              data {
                lopHocPhanId
                maLopHocPhan
                tenVietTat
                tenLopHocPhan
                soNhomThucHanh
                trangThaiLopHocPhan
                soLuongToiDa
                moTa
              }
            }
          }
        `
    }
}