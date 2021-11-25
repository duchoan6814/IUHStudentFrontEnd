import {gql} from "@apollo/client";
// eslint-disable-next-line import/no-anonymous-default-export
export default{
    mutation:{
        createLop:(fragment)=>gql`
        mutation CREATE_LOP($tenLop:String!, $khoaHoc:String! ){
          createLop(tenLop:$tenLop,khoaHoc:$khoaHoc){
               status
               message
               errors{
                 message
                 error_fields
               }
               data{
                lopId
                tenLop
                khoaHoc
               }
             }
        }
        `
    }
}