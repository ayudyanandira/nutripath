import axiosClient from "./axiosClient";

const authApi = {
  register(data) {
    // { email, password }
    return axiosClient.post("/auth/register", data);
  },
  login(data) {
    // { email, password }
    return axiosClient.post("/auth/login", data);
  },
};

export default authApi;