import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
// import streamReducer from './streamSlice';
// import videoChatReducer from './videoChatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    // stream: streamReducer,
    // videoChat: videoChatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});