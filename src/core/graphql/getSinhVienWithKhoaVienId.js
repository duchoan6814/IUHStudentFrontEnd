import { gql } from "@apollo/client";

export default {
  query: {
    getSinhVienWithKhoaVienId: (fragment) => gql`
        query GET_SINHVIEN_WITH_KHOA($khoaVienId:ID!) {
            getSinhVienWithKhoaVienId(khoaVienId: $khoaVienId){
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