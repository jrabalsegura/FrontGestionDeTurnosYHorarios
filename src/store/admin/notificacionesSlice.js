import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const notificacionesSlice = createSlice({
    name: 'notificaciones',
    initialState: {
        notificaciones: []
    },
    reducers: {
        onfetchedNotifications: (state, action) => {
            state.notificaciones = action.payload;
        },
        removeNotificacion: (state, action) => {
            state.notificaciones = state.notificaciones.filter(notificacion => notificacion._id !== action.payload);
        }
    }
});

export const { removeNotificacion, onfetchedNotifications } = notificacionesSlice.actions;
