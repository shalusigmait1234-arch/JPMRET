import { configureStore } from '@reduxjs/toolkit';
import { adminApi } from './api/adminApi';
import { contactApi } from './api/contactApi';
import { contentApi } from './api/contentApi';

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApi.middleware, contactApi.middleware, contentApi.middleware),
});
