// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Fetch department name by ID
// export const fetchDepartment = createAsyncThunk(
//   "department/fetchDepartment",
//   async (deptId, thunkAPI) => {
//     if (!deptId) return ""; // Skip if no deptId

//     try {
//       const response = await axios.get(`/api/dept/${deptId}`);
//       return response.data; // Expecting { deptId, deptName }
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Error fetching department"
//       );
//     }
//   }
// );

// const initialState = {
//   name: null,
//   loading: false,
//   error: null,
// };

// const departmentSlice = createSlice({
//   name: "department",
//   initialState,
//   reducers: {
//     clearDepartment: (state) => {
//       state.name = null;
//       state.error = null;
//       state.loading = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDepartment.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchDepartment.fulfilled, (state, action) => {
//         state.loading = false;
//         state.name = action.payload?.deptName || "-"; // ✅ fixed
//       })
//       .addCase(fetchDepartment.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearDepartment } = departmentSlice.actions;
// export default departmentSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch department name by ID
export const fetchDepartment = createAsyncThunk(
  "department/fetchDepartment",
  async (deptId, thunkAPI) => {
    if (!deptId) return "";

    try {
      const response = await axios.get(`/api/dept/${deptId}`);
      console.log("API /dept response:", response.data); // 👀 debug log
      return response.data;
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

        // Handle both formats (string or object)
        if (typeof action.payload === "string") {
          state.name = action.payload;
        } else if (typeof action.payload === "object") {
          state.name = action.payload?.name || "-";
        } else {
          state.name = "-";
        }
      })
      .addCase(fetchDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;

