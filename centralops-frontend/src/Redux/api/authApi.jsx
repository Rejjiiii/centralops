// Handles all auth-related API requests
import axios from "axios";

const API_URL = "http://192.168.40.127:8080/api";


// Login request
export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });
  return response.data; // { token, user }
};

//Fetch user profile by ID
export const fetchUserProfile = async (id, token) => {
  const response = await axios.get(`${API_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; // user profile
};





// const API_URL = "http://localhost:8080/api/auth"; // change to your backend

// // Function to send login request to backend
// export const loginUser = async (credentials) => {
//   // POST request to backend /login with username + password
//     const response = await axios.post(`${API_URL}/login`, credentials);
//   return response.data; // expecting { token, user }
// };