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

    }
});

export const { setNothingSelectedView, setShowUsersView } = adminScreenSlice.actions;

