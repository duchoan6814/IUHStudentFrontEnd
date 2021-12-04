import { gql } from "@apollo/client";
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    mutation: {
        createHocPhan: (fragment) => gql`
        mutation CREATE_KHOAHPCPHAN($inputs: HocPhanInput!){
            createHocPhan(inputs:$inputs){
               status
               message
               errors{
                 message
                 error_fields
               }
               data{
                hocPhanId
                maHocPhan
                soTinChiLyThuyet
                getSoTinChiThucHanh
                moTa
                batBuoc
               }
             }
        }
        `
    }
}