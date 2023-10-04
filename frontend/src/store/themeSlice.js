import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const themeAdapter = createEntityAdapter();
const initialState = themeAdapter.getInitialState({
    theme: 'light'
});

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }
    }
});

const { actions, reducer } = themeSlice;

export default reducer;

export const {
    setTheme,
    toggleTheme
} = actions;