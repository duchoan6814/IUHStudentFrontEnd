import { gql } from "@apollo/client";

export default {
  query: {
    getNamHocWithKhoaVienId: (fragment) => gql`
        query GET_NAMHOC_WITH_KHOAVIENID($khoaVienId: ID!) {
          getNamHocWithKhoaVienId(khoaVienId: $khoaVienId){
            status
            message
            errors{
              message
              error_fields
            }
               data{
                namHoc
               }
             }
        }
        `
  }
}