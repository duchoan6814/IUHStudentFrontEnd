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
import createLop from "./createLop";
import getMonHocs from "./getMonHocs";
import createMonHoc from "./createMonHoc";
import getHocKys from "./getHocKys";
import getChuyenNganhs from "./getChuyenNganhs";
import updateMonHoc from "./updateMonHoc";
import createChuyenNganh from "./createChuyenNganh";
import updateChuyenNganh from "./updateChuyenNganh";
import deleteMonHoc from "./deleteMonHoc";
import deleteChuyenNganh from "./deleteChuyenNganh";
const query = {
  ...Login.query,
  ...GetProfile.query,
  ...getKhoas.query,
  ...getSinhViens.query,
  ...getLops.query,
  ...getMonHocs.query,
  ...getHocKys.query,
  ...getChuyenNganhs.query,
};

const mutation = {
  ...deleteKhoa.mutation,
  ...createKhoa.mutation,
  ...updateKhoa.mutation,
  ...createSinhVien.mutation,
  ...updateSinhVien.mutation,
  ...createLop.mutation,
  ...createMonHoc.mutation,
  ...updateMonHoc.mutation,
  ...createChuyenNganh.mutation,
  ...updateChuyenNganh.mutation,
  ...deleteMonHoc.mutation,
  ...deleteChuyenNganh.mutation,
};

export default {
  query,
  mutation,
};
