import Login from "./login";
import GetProfile from "./getProfile";
import getKhoas from "./getKhoas";
import getSinhViens from "./getSinhViens";
import deleteKhoa from "./deleteKhoa";
import createKhoa from "./createKhoa";
import updateKhoa from "./updateKhoa";
import createSinhVien from "./createSinhVien";
import updateSinhVien from "./updateSinhVien";
const query = {
  ...Login.query,
  ...GetProfile.query,
  ...getKhoas.query,
  ...getSinhViens.query,
};

const mutation = {
  ...deleteKhoa.mutation,
  ...createKhoa.mutation,
  ...updateKhoa.mutation,
  ...createSinhVien.mutation,
  ...updateSinhVien.mutation,
};

export default {
  query,
  mutation,
};
