import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch personal info by employee ID
export const fetchPersonalInfo = createAsyncThunk(
  "personalInfo/fetchPersonalInfo",
  async (empId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/per-info/${empId}`);
      console.log("PersonalInfo API response:", response.data); // 👀 debug log
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
    empId: null,
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    deptId: null,
    sectionId: null,
    roleId: null,
    positionId: null,
    imgSrc: null,
    regDate: null,
    updateDate: null,
    statusCode: null,
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
      state.data = { ...initialState.data }; // reset all fields
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

        // Replace with API data but preserve array/object defaults if missing
        state.data = {
          ...initialState.data,
          ...action.payload,
          tasks: action.payload?.tasks ?? [],
          projects: action.payload?.projects ?? [],
          performance: action.payload?.performance ?? null,
          events: action.payload?.events ?? [],
          activity: action.payload?.activity ?? [],
        };
      })
      .addCase(fetchPersonalInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPersonalInfo } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;
