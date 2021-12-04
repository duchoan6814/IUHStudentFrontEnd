import { gql } from "@apollo/client";

export default {
  query: {
    getChuyenNganhWithKhoaVienId: (fragment) => gql`
        query GET_CHUYENNGANH_WITH_KHOA($khoaVienId:ID!) {
            getChuyenNganhWithKhoaVienId(khoaVienId: $khoaVienId){
            status
            message
            errors{
              message
              error_fields
            }
            data{
                chuyenNganhId
                tenChuyenNganh
               }
            }
        }
    `
  }
}