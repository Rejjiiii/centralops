import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        "/api/auth/login", // backend login endpoint
        { username, password },
        { withCredentials: true } // keep cookies/session if backend uses them
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
  user: null,          // full employee object
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

        // check if backend returned a valid employee object
        if (action.payload?.empId) {
          state.user = action.payload; // save the whole employee object
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
