import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSection = createAsyncThunk(
  "section/fetchSection",
  async (sectionId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/sect/${sectionId}`);
      return response.data; // sectionName
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching section"
      );
    }
  }
);

const initialState = {
  name: null,
  loading: false,
  error: null,
};

const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    clearSection: (state) => {
      state.name = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSection.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload;
      })
      .addCase(fetchSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSection } = sectionSlice.actions;
export default sectionSlice.reducer;
