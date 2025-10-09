import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ===========================
   ASYNC THUNKS
   =========================== */

// Employees
export const fetchEmployees = createAsyncThunk(
  "meta/fetchEmployees",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/users", { withCredentials: true });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch employees");
    }
  }
);

export const addEmployee = createAsyncThunk(
  "meta/addEmployee",
  async (newEmployee, thunkAPI) => {
    try {
      const response = await axios.post("/api/users", newEmployee, { withCredentials: true });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to add employee");
    }
  }
);

// Personal Info
export const fetchPersonalInfo = createAsyncThunk(
  "meta/fetchPersonalInfo",
  async (empId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/per-info/${empId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error fetching personal info");
    }
  }
);

// Department
export const fetchDepartment = createAsyncThunk(
  "meta/fetchDepartment",
  async (deptId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/dept/${deptId}`);
      return { id: deptId, data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error fetching department");
    }
  }
);

// Section
export const fetchSection = createAsyncThunk(
  "meta/fetchSection",
  async (sectionId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/sect/${sectionId}`);
      return { id: sectionId, data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error fetching section");
    }
  }
);

// Role
export const fetchRole = createAsyncThunk(
  "meta/fetchRole",
  async (roleId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/role/${roleId}`);
      return { id: roleId, data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error fetching role");
    }
  }
);

// Position
export const fetchPosition = createAsyncThunk(
  "meta/fetchPosition",
  async (positionId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/pos/${positionId}`);
      return { id: positionId, data: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error fetching position");
    }
  }
);

/* ===========================
   INITIAL STATE
   =========================== */
const initialState = {
  employees: { list: [], loading: false, error: null },
  personalInfo: {
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
  },
  department: { map: {}, loading: false, error: null },
  section: { map: {}, loading: false, error: null },
  role: { map: {}, loading: false, error: null },
  position: { map: {}, loading: false, error: null },
};

/* ===========================
   SLICE
   =========================== */
const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    clearPersonalInfo: (state) => {
      state.personalInfo.data = { ...initialState.personalInfo.data };
      state.personalInfo.error = null;
      state.personalInfo.loading = false;
    },
    clearDepartment: (state) => {
      state.department = { ...initialState.department };
    },
    clearSection: (state) => {
      state.section = { ...initialState.section };
    },
    clearRole: (state) => {
      state.role = { ...initialState.role };
    },
    clearPosition: (state) => {
      state.position = { ...initialState.position };
    },
  },
  extraReducers: (builder) => {
    /* Employees */
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.employees.loading = true;
        state.employees.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees.loading = false;
        state.employees.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.employees.loading = false;
        state.employees.error = action.payload;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.list.push(action.payload);
      });

    /* Personal Info */
    builder
      .addCase(fetchPersonalInfo.pending, (state) => {
        state.personalInfo.loading = true;
        state.personalInfo.error = null;
      })
      .addCase(fetchPersonalInfo.fulfilled, (state, action) => {
        state.personalInfo.loading = false;
        state.personalInfo.data = {
          ...initialState.personalInfo.data,
          ...action.payload,
          tasks: action.payload?.tasks ?? [],
          projects: action.payload?.projects ?? [],
          performance: action.payload?.performance ?? null,
          events: action.payload?.events ?? [],
          activity: action.payload?.activity ?? [],
        };
      })
      .addCase(fetchPersonalInfo.rejected, (state, action) => {
        state.personalInfo.loading = false;
        state.personalInfo.error = action.payload;
      });

    /* Department */
    builder.addCase(fetchDepartment.fulfilled, (state, action) => {
      const { id, data } = action.payload;
      state.department.map[id] = typeof data === "string" ? data : data?.name || "-";
    });

    /* Section */
    builder.addCase(fetchSection.fulfilled, (state, action) => {
      const { id, data } = action.payload;
      state.section.map[id] = typeof data === "string" ? data : data?.name || "-";
    });

    /* Role */
    builder.addCase(fetchRole.fulfilled, (state, action) => {
      const { id, data } = action.payload;
      state.role.map[id] = typeof data === "string" ? data : data?.name || "-";
    });

    /* Position */
    builder.addCase(fetchPosition.fulfilled, (state, action) => {
      const { id, data } = action.payload;
      state.position.map[id] = typeof data === "string" ? data : data?.name || "-";
    });
  },
});

export const {
  clearPersonalInfo,
  clearDepartment,
  clearSection,
  clearRole,
  clearPosition,
} = metaSlice.actions;

export default metaSlice.reducer;
