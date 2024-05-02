import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNotifications } from "../../admin/helpers";

// Async thunk
export const fetchNotifications = createAsyncThunk(
    'notificaciones/fetchNotifications',
    async () => {
        const response = await getNotifications();
        return response;
    }
);

export const notificacionesSlice = createSlice({
    name: 'notificaciones',
    initialState: {
        notificaciones: []
    },
    reducers: {
        removeNotificacion: (state, action) => {
            state.notificaciones = state.notificaciones.filter(notificacion => notificacion._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            state.notificaciones = action.payload;
        });
    }
});

export const { removeNotificacion } = notificacionesSlice.actions;
