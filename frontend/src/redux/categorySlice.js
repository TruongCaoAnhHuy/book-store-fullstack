const { createSlice } = require('@reduxjs/toolkit');

const initialState = [];

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setDataCategory: (state, action) => {
            state = [...action.payload];
            localStorage.setItem('cartItems', JSON.stringify(state));
        },
    },
});

export const { setDataCategory } = categorySlice.actions;

export default categorySlice.reducer;
