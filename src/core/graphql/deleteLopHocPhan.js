/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
    mutation: {
        deleteLopHocPhan: (fragment) => gql`
        mutation DELETE_LOPHOCPHAN($lopHocPhanId: ID!) {
            deleteLopHocPhan(lopHocPhanId: $lopHocPhanId) {
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