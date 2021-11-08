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
const query = {
  ...Login.query,
  ...GetProfile.query,
  ...getKhoas.query,
  ...getSinhViens.query,
  ...getLops.query,
};

const mutation = {
  ...deleteKhoa.mutation,
  ...createKhoa.mutation,
  ...updateKhoa.mutation,
  ...createSinhVien.mutation,
  ...updateSinhVien.mutation,
  ...createLop.mutation,
};

export default {
  query,
  mutation,
};
