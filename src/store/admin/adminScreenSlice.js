import { createSlice } from '@reduxjs/toolkit';

export const adminScreenSlice = createSlice({
    name: 'adminScreen',
    initialState: {
        screen: 'nothingSelectedView',
        props: null
    },
    reducers: {
        setNothingSelectedView: (state) => {
            state.screen = 'nothingSelectedView';
            state.props = null;
        },
        setShowUsersView: (state) => {
            state.screen = 'showUsersView';
            state.props = null;
        },
        setAddUserView: (state, {payload}) => {
            state.screen = 'addUserView';
            state.props = payload;
        },
        setEditUserView: (state, {payload}) => {
            state.screen = 'editUserView';
            state.props = payload;
        },
        setCalcularNominaView: (state) => {
            state.screen = 'calcularNominaView';
            state.props = null;
        },
        setSeeNominaView: (state, {payload}) => {
            state.screen = 'seeNominaView';
            state.props = payload;
        },
        setCalcularFiniquitoView: (state) => {
            state.screen = 'calcularFiniquitoView';
            state.props = null;
        },
        setSeeFiniquitoView: (state, {payload}) => {
            state.screen = 'seeFiniquitoView';
            state.props = payload;
        },
        setAsignarTurnosView: (state) => {
            state.screen = 'asignarTurnosView';
            state.props = null;
        },
        setGestionarVacacionesView: (state) => {
            state.screen = 'gestionarVacacionesView';
            state.props = null;
        },
        setConsultarRegistroView: (state) => {
            state.screen = 'consultarRegistroView';
            state.props = null;
        },
        setShowNotificacionesView: (state) => {
            state.screen = 'showNotificacionesView';
            state.props = null;
        }
    }
});

export const { 
    setNothingSelectedView, 
    setShowUsersView, 
    setAddUserView,
    setEditUserView,
    setCalcularNominaView,
    setSeeNominaView,
    setCalcularFiniquitoView,
    setSeeFiniquitoView,
    setAsignarTurnosView,
    setGestionarVacacionesView,
    setConsultarRegistroView,
    setShowNotificacionesView
} = adminScreenSlice.actions;

