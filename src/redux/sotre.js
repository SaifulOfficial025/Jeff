
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './features/baseApi'
import projectReducer from './features/projectSlice'
import employeeReducer from './features/employeeSlice';

// ...existing code...
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    project: projectReducer,
    employee: employeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // Ignore these paths in the state
        ignoredPaths: ['register'],
      }
    }).concat(baseApi.middleware),
})
// ...existing code...


