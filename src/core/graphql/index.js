import Login from "./login";
import GetProfile from "./getProfile";

const query = {
  ...Login.query,
  ...GetProfile.query,
};

const mutation = {};

export default {
  query,
  mutation,
};
