import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        "/api/auth/login", // or '/api/auth/login' with proxy
        { username, password },
        { withCredentials: true } // important for session
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong during login";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  user: null,
  role: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.user = action.payload.empId;
          state.role = action.payload.roleId;
          state.isAuthenticated = true;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
