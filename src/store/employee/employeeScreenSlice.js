import { createSlice } from "@reduxjs/toolkit";

export const employeeScreenSlice = createSlice({
    name: 'employeeScreen',
    initialState: {
        screen: 'nothingSelectedView',
        props: null
    },
    reducers: {
        setNothingSelectedView: (state) => {
            state.screen = 'nothingSelectedView';
            state.props = null;
        },
        setEditUserView: (state) => {
            state.screen = 'editUserView';
            state.props = null;
        },
        setCalendarView: (state) => {
            state.screen = 'calendarView';
            state.props = null;
        },
        setNominasView: (state) => {
            state.screen = 'nominasView';
            state.props = null;
        },
        setCalculadoraView: (state) => {
            state.screen = 'calculadoraView';
            state.props = null;
        },
        setSolicitarVacacionesView: (state) => {
            state.screen = 'solicitarVacacionesView';
            state.props = null;
        }
    }
});

export const { 
    setNothingSelectedView,
    setEditUserView,
    setCalendarView,
    setNominasView,
    setCalculadoraView,
    setSolicitarVacacionesView
} = employeeScreenSlice.actions;

