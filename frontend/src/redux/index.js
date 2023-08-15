import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './userSlice';
import productSliceReducer from './productSlice';
import cartSliceReducer from './cartSlice';
import orderSliceReducer from './orderSlice';
import categorySliceReducer from './categorySlice';

export const store = configureStore({
    reducer: {
        user: userSliceReducer,
        product: productSliceReducer,
        cart: cartSliceReducer,
        order: orderSliceReducer,
        category: categorySliceReducer,
    },
});
