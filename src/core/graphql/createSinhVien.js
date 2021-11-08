import { gql } from "@apollo/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    mutation: {
        createSinhVien: (fragment) => gql`
        mutation CREATE_SINHVIEN($inputs:RegisterAccountInput!){
            createSinhVien(inputs:$inputs){
               status
              message
              errors{
                message
                error_fields
              }
              data{
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