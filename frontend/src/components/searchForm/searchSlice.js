import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const searchAdapter = createEntityAdapter();
const initialState = searchAdapter.getInitialState({
    query: ''
});

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        querySent: (state, action) => {
            state.query = action.payload;
        }
    }
});

const {actions, reducer} = searchSlice;

export default reducer;

export const {selectAll} = searchAdapter.getSelectors(state => state.search);

export const {
    querySent
} = actions;