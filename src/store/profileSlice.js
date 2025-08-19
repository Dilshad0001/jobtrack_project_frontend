// src/store/profileSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosInstance } from './AxioInstance';
// import axiosInstance from './AxioInstance';

// Fetch profile
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
    //   const token = localStorage.getItem('accessToken');
    //   const res = await axios.get('http://127.0.0.1:8000/user/profile/',
        const res=await axiosInstance.get('auth/user/profile/'
        //  {headers: { Authorization: `Bearer ${token}` }}
        );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update profile
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (formData, { rejectWithValue }) => {
    try {
    //   const token = localStorage.getItem('accessToken');
    //   const res = await axios.patch('http://127.0.0.1:8000/user/profile/'
       const res=await axiosInstance.patch('auth/user/profile/'
        , formData
        // {headers: { Authorization: `Bearer ${token}` }}
        );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Create profile
export const createProfile = createAsyncThunk(
  'profile/createProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('accessToken');
    //   const res = await axios.post('http://127.0.0.1:8000/user/profile/'
        const res=await axiosInstance.post("auth/user/profile/",
        formData, 
        // {headers: { Authorization: `Bearer ${token}` }}
    );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null,
    loading: false,
    error: null,
    created: false
  },
  reducers: {
    clearCreated(state) {
      state.created = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.created = true;
      });
  }
});

export const { clearCreated } = profileSlice.actions;
export default profileSlice.reducer;
