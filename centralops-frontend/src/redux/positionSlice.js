import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosition = createAsyncThunk(
  "position/fetchPosition",
  async (positionId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/pos/${positionId}`);
      return response.data; // positionName
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching position"
      );
    }
  }
);

const initialState = {
  name: null,
  loading: false,
  error: null,
};

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    clearPosition: (state) => {
      state.name = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosition.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload;
      })
      .addCase(fetchPosition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPosition } = positionSlice.actions;
export default positionSlice.reducer;
