
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
    getDefaultMiddleware().concat(baseApi.middleware),
})
// ...existing code...


