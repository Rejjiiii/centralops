import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  fetchPersonalInfo,
  fetchDepartment,
  fetchSection,
  fetchRole,
  fetchPosition,
} from "../metaSlice"; // import meta thunks

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        "/api/auth/login",
        { username, password },
        { withCredentials: true }
      );

      const user = response.data;

      if (user?.empId) {
        // Automatically fetch related data
        thunkAPI.dispatch(fetchPersonalInfo(user.empId));

        if (user.deptId) thunkAPI.dispatch(fetchDepartment(user.deptId));
        if (user.sectionId) thunkAPI.dispatch(fetchSection(user.sectionId));
        if (user.roleId) thunkAPI.dispatch(fetchRole(user.roleId));
        if (user.positionId) thunkAPI.dispatch(fetchPosition(user.positionId));
      }

      return user;
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong during login";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  user: null,
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
        if (action.payload?.empId) {
          state.user = action.payload;
          state.isAuthenticated = true;
        } else {
          state.error = action.payload?.message || "Invalid login response";
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
