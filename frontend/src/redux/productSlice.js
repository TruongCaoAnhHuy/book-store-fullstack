const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
    productList: [],
    productSliderList: [],
    productFeatureList: [],
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setDataProduct: (state, action) => {
            state.productList = [...action.payload];
        },
        setDataProductSlider: (state, action) => {
            state.productSliderList = [...action.payload];
        },
        setDataProductFeature: (state, action) => {
            state.productFeatureList = [...action.payload];
        },
    },
});

export const { setDataProduct, setDataProductSlider, setDataProductFeature } = productSlice.actions;

export default productSlice.reducer;
