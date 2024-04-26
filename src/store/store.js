import { configureStore } from "@reduxjs/toolkit";
import { authSlice, adminScreenSlice } from './';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        adminScreen: adminScreenSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

