/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
    mutation: {
      updateSinhVien: (fragment) => gql`
        mutation UPDATE_SINHVIEN($inputs: SinhVienUpdateInput!, $maSinhVien: String!){
            updateSinhVien(
                inputs: $inputs
                maSinhVien: $maSinhVien
            ) {
              status
              message
              errors {
                message
                error_fields
              }
              data {
                sinhVienId
                maSinhVien
                maHoSo
                image
                hoTenDem
                ten
                gioiTinh
                ngaySinh
                bacDaoTao
                trangThai
                loaiHinhDaoTao
                ngayVaoTruong
                ngayVaoDoan
                soDienThoai
                diaChi
                noiSinh
                hoKhauThuongTru
                danToc
                ngayVaoDang
                email
                tonGiao
              }
            }
          }
        `
    }
}