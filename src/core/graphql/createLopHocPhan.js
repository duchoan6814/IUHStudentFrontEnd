import { gql } from "@apollo/client";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  mutation: {
    createLopHocPhan: (fragment) => gql`
        mutation CREATE_LOPHOCPHAN($inputs:LopHocPhanInput! ){
          createLopHocPhan(inputs:$inputs){
               status
               message
               errors{
                 message
                 error_fields
               }
               data{
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