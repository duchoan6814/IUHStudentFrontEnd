import Login from "./login";
import GetProfile from "./getProfile";
import getKhoas from "./getKhoas";
import getSinhViens from "./getSinhViens";
import deleteKhoa from "./deleteKhoa";
import createKhoa from "./createKhoa";
import updateKhoa from "./updateKhoa";
import createSinhVien from "./createSinhVien";
import updateSinhVien from "./updateSinhVien";
import getLops from "./getLops";
import createLop from "./createLopHocPhan";
import getMonHocs from "./getMonHocs";
import createMonHoc from "./createMonHoc";
import getHocKys from "./getHocKys";
import getChuyenNganhs from "./getChuyenNganhs";
import updateMonHoc from "./updateMonHoc";
import createChuyenNganh from "./createChuyenNganh";
import updateChuyenNganh from "./updateChuyenNganh";
import deleteMonHoc from "./deleteMonHoc";
import deleteChuyenNganh from "./deleteChuyenNganh";
import createHocKy from "./createHocKy";
import updateHocKy from "./updateHocKy";
import deleteHocKy from "./deleteHocKy";
import getNamHocWithKhoaVienId from "./getNamHocWithKhoaVienId";
import getSinhVienWithKhoaVienIdAndNgayVaoTruong from "./getSinhVienWithKhoaVienIdAndNgayVaoTruong";
import getSinhVienWithKhoaVienId from "./getSinhVienWithKhoaVienId";
import getChuyenNganhWithKhoaVienId from "./getChuyenNganhWithKhoaVienId";
import deleteSinhVien from "./deleteSinhVien";
import getLopHocPhans from "./getLopHocPhans";
import deleteLopHocPhan from "./deleteLopHocPhan";
import createLopHocPhan from "./createLopHocPhan";
import updateLopHocPhan from "./updateLopHocPhan";
import getHocPhans from "./getHocPhans";
import createHocPhan from "./createHocPhan";
import updateHocPhan from "./updateHocPhan";
import deleteHocPhan from "./deleteHocPhan";
const query = {
  ...Login.query,
  ...GetProfile.query,
  ...getKhoas.query,
  ...getSinhViens.query,
  ...getLops.query,
  ...getMonHocs.query,
  ...getHocKys.query,
  ...getChuyenNganhs.query,
  ...getNamHocWithKhoaVienId.query,
  ...getSinhVienWithKhoaVienIdAndNgayVaoTruong.query,
  ...getSinhVienWithKhoaVienId.query,
  ...getChuyenNganhWithKhoaVienId.query,
  ...getLopHocPhans.query,
  ...getHocPhans.query,
};

const mutation = {
  ...deleteKhoa.mutation,
  ...createKhoa.mutation,
  ...updateKhoa.mutation,
  ...createSinhVien.mutation,
  ...updateSinhVien.mutation,
  ...createLopHocPhan.mutation,
  ...createMonHoc.mutation,
  ...updateMonHoc.mutation,
  ...createChuyenNganh.mutation,
  ...updateChuyenNganh.mutation,
  ...deleteMonHoc.mutation,
  ...deleteChuyenNganh.mutation,
  ...createHocKy.mutation,
  ...updateHocKy.mutation,
  ...deleteHocKy.mutation,
  ...deleteSinhVien.mutation,
  ...deleteLopHocPhan.mutation,
  ...updateLopHocPhan.mutation,
  ...createHocPhan.mutation,
  ...updateHocPhan.mutation,
  ...deleteHocPhan.mutation,
};

export default {
  query,
  mutation,
};
