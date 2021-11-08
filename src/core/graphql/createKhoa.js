import {gql} from "@apollo/client";
// eslint-disable-next-line import/no-anonymous-default-export
export default{
    mutation:{
        createKhoa:(fragment)=>gql`
        mutation CREATE_KHOA($inputs: KhoaInput!){
            createKhoa(inputs:$inputs){
               status
               message
               errors{
                 message
                 error_fields
               }
               data{
                    khoaVienId
                    lienKet
                    tenKhoaVien
               }
             }
        }
        `
    }
}