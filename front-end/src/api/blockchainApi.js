import axiosClient from "./axiosClient";

const blockchainApi = {
  makePayment: (data) => axiosClient.post("/blockchain/payment", data),
};

export default blockchainApi;
