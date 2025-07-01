import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';
import profileReducer from './profileSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer
  },
});
