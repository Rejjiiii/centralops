import axios from "axios";

const API_URL = "http://192.168.40.127:8080/api/users";

// fetch user profile with token
export const fetchUsersApi = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // profile data
};




// export const fetchUsers = async () => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const response = await axios.get(API_URL);
//     console.log("Fetched data:", response.data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
