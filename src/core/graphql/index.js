import Login from "./login";
import GetProfile from "./getProfile";
import GetSinhViens from "./getSinhViens";

const query = {
  ...Login.query,
  ...GetProfile.query,
  ...GetSinhViens.query,
};

const mutation = {};

export default {
  query,
  mutation,
};
