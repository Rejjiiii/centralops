import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  fetchDepartment,
  fetchSection,
  fetchRole,
  fetchPosition,
} from "../metaSlice"; // import meta thunks

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, thunkAPI) => {
    try {
      // Step 1: login via existing endpoint
      const response = await axios.post(
        "/api/auth/login",
        { username, password },
        { withCredentials: true }
      );

      const loginUserData = response.data;

      if (!loginUserData?.empId) {
        return thunkAPI.rejectWithValue("Invalid login response");
      }

      const empId = loginUserData.empId;

      // Step 2: fetch full user info by empId
      const userResponse = await axios.get(`/api/users/${empId}`);
      const fullUser = userResponse.data;

      // Step 3: merge full name and email from loginUserData into fullUser
      const mergedUser = {
        ...fullUser,
        firstName: loginUserData.firstName || fullUser.firstName,
        lastName: loginUserData.lastName || fullUser.lastName,
        email: loginUserData.email || fullUser.email,
      };

      // Step 4: fetch meta info if available
      if (mergedUser.deptId) thunkAPI.dispatch(fetchDepartment(mergedUser.deptId));
      if (mergedUser.sectionId) thunkAPI.dispatch(fetchSection(mergedUser.sectionId));
      if (mergedUser.roleId) thunkAPI.dispatch(fetchRole(mergedUser.roleId));
      if (mergedUser.positionId) thunkAPI.dispatch(fetchPosition(mergedUser.positionId));

      return mergedUser;
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
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
