import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./AxioInstance";
// import axiosInstance from "./AxioInstance";
// import axiosInstance from "../../api/axiosInstance";

// Async thunk to fetch self user
export const fetchSelfUser = createAsyncThunk(
  "user/fetchSelfUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("auth/user/self/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching user");
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSelfUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSelfUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchSelfUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load user";
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
