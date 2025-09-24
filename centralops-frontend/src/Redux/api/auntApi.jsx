import axios from "axios";

const API_URL = "http://192.168.40.127:8080/api/auth/login";

export const loginApi = async (credentials) => {
  const response = await axios.post(API_URL, credentials);
  return response.data; // { token, ... }
};