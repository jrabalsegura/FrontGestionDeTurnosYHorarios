import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from './';
import { adminScreenSlice } from './admin/adminScreenSlice';
import { employeeScreenSlice } from './employee/employeeScreenSlice';
import { notificacionesSlice } from './admin/notificacionesSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        adminScreen: adminScreenSlice.reducer,
        employeeScreen: employeeScreenSlice.reducer,
        notificaciones: notificacionesSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

