import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRole = createAsyncThunk(
  "role/fetchRole",
  async (roleId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/role/${roleId}`);
      return response.data; // roleName
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching role"
      );
    }
  }
);

const initialState = {
  name: null,
  loading: false,
  error: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    clearRole: (state) => {
      state.name = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRole.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload;
      })
      .addCase(fetchRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearRole } = roleSlice.actions;
export default roleSlice.reducer;
    