import Login from "./login";
import GetProfile from "./getProfile";
import getKhoas from "./getKhoas";
import getSinhViens from "./getSinhViens";
const query = {
  ...Login.query,
  ...GetProfile.query,
  ...getKhoas.query,
  ...getSinhViens.query,
};

const mutation = {};

export default {
  query,
  mutation,
};
