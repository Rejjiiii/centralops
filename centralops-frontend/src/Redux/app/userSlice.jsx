import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, fetchUserProfile } from "../api/authApi";

//Thunk: login
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await loginUser(username, password);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);


//Thunk: fetch profile
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      return await fetchUserProfile(id, token);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Profile fetch failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    profile: null,
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.profile = null;
      localStorage.removeItem("auth");
    },

    loadAuth: (state) => {
      const saved = localStorage.getItem("auth");
      if (saved) {
        const { user, token } = JSON.parse(saved);
        state.user = user;
        state.token = token;
      }
    },
  },

 
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("auth", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, loadAuth } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { loginUser } from "../api/authApi";

// // Thunk (async action) to handle login process
// export const login = createAsyncThunk("user/login", async (credentials, thunkAPI) => {
//   try {
//     // Call the API and return the result
//     return await loginUser(credentials);
//   } catch (error) {
//     // If login fails, return error response
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     user: null,       // Store user details
//     token: null,      // Store JWT token
//     loading: false,   // Loading indicator
//     error: null,      // Store error messages
//   },
//   reducers: {
//     // Logout function → clears user and token
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem("token"); // Remove token from storage
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // While login request is pending
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       // When login succeeds
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;     // Save user data
//         state.token = action.payload.token;   // Save token
//         localStorage.setItem("token", action.payload.token); // Persist token
//       })
//       // When login fails
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Login failed";
//       });
//   },
// });

// export const { logout } = userSlice.actions;
// export default userSlice.reducer;