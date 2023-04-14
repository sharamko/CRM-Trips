import { configureStore } from '@reduxjs/toolkit';
import slice from './slice';

export const store = configureStore({
  reducer: {
    reducer: slice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
