import { configureStore } from "@reduxjs/toolkit";
import { authSlice, adminScreenSlice, employeeScreenSlice } from './';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        adminScreen: adminScreenSlice.reducer,
        employeeScreen: employeeScreenSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

