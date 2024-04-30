import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from './';
import { adminScreenSlice } from './admin/adminScreenSlice';
import { employeeScreenSlice } from './employee/employeeScreenSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        adminScreen: adminScreenSlice.reducer,
        employeeScreen: employeeScreenSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

