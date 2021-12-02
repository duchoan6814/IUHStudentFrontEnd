import { gql } from "@apollo/client";

export default {
  query: {
    getSinhVienWithKhoaVienIdAndNgayVaoTruong: (fragment) => gql`
        query GET_SINHVIEN_WITH_KHOA_AND_NAM($khoaVienId:ID!,$ngayVaoTruong:String!) {
            getSinhVienWithKhoaVienIdAndNgayVaoTruong(khoaVienId: $khoaVienId,ngayVaoTruong:$ngayVaoTruong){
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