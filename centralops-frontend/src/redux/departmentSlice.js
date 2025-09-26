import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch department name by ID, only if deptId is valid
export const fetchDepartment = createAsyncThunk(
  "department/fetchDepartment",
  async (deptId, thunkAPI) => {
    if (!deptId) return ""; // Return empty string immediately if invalid

    try {
      const response = await axios.get(`/api/dept/${deptId}`);
      return response.data; // deptName
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching department"
      );
    }
  }
);

const initialState = {
  name: null,
  loading: false,
  error: null,
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    clearDepartment: (state) => {
      state.name = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload || "-"; // fallback if empty string
      })
      .addCase(fetchDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;
