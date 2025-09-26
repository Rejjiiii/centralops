import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch personal info by employee ID
export const fetchPersonalInfo = createAsyncThunk(
  "personalInfo/fetchPersonalInfo",
  async (empId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/per-info/${empId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error fetching personal info"
      );
    }
  }
);

const initialState = {
  data: {
    empId: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    deptId: "",
    sectionId: "",
    roleId: "",
    positionId: "",
    imgSrc: "",
    regDate: "",
    updateDate: "",
    statusCode: "",
    tasks: [],
    projects: [],
    performance: null,
    events: [],
    activity: [],
  },
  loading: false,
  error: null,
};

const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {
    clearPersonalInfo: (state) => {
      state.data = { ...initialState.data };
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonalInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = { ...state.data, ...action.payload }; // merge API data with default
      })
      .addCase(fetchPersonalInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPersonalInfo } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;
