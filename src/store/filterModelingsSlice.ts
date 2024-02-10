import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        lowPrice: 0,
        highPrice: 100000000,
        searchValue: "",
    },
    reducers: {
        setLowPrice: (state, action) => {
            state.lowPrice = action.payload;
        },
        setHighPrice: (state, { payload }) => {
            state.highPrice = payload;
        },
        setSearchValue: (state, { payload }) => {
            state.searchValue = payload;
        },
    },
});

export default filterSlice.reducer;
export const { setLowPrice, setHighPrice, setSearchValue } =
    filterSlice.actions;
