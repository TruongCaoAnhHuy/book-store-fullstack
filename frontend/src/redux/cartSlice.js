import { createSlice } from '@reduxjs/toolkit';

const item = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
    carts: item,
    quantity: 0,
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        AddCart: (state, action) => {
            const currentUser = localStorage.getItem('user');
            if (currentUser) {
                const find = state.carts.findIndex(
                    (item) => item.name === action.payload.name && item.type === action.payload.type,
                );
                if (find >= 0) {
                    state.carts[find].quantity += action.payload.quantity;
                    alert('Add to cart success !!');
                } else {
                    const tempvar = { ...action.payload };
                    state.carts.push(tempvar);
                    alert('Add to cart success !!');
                }
            } else {
                alert('Login please !');
                return;
            }
            localStorage.setItem('cartItems', JSON.stringify(state.carts.map((item) => item)));
        },

        GetTotal: (state) => {
            let amount = 0;
            let total = 0;
            state.carts.forEach((item) => {
                amount += item.quantity;
                total += item.quantity * item.price;
            });
            state.quantity = amount;
            state.total = total;
        },

        RemoveCart: (state, action) => {
            state.carts = state.carts.filter(
                (item) => item.name !== action.payload[0] || item.type !== action.payload[1],
            );
            localStorage.setItem('cartItems', JSON.stringify(state.carts));
        },

        Increase: (state, action) => {
            state.carts = state.carts.map((carts) => {
                if (carts.name === action.payload[0] && carts.type === action.payload[1]) {
                    return { ...carts, quantity: carts.quantity + 1 };
                }
                return carts;
            });
            localStorage.setItem('cartItems', JSON.stringify(state.carts));
        },

        Decrease: (state, action) => {
            state.carts = state.carts
                .map((carts) => {
                    if (carts.name === action.payload[0] && carts.type === action.payload[1]) {
                        return { ...carts, quantity: carts.quantity - 1 };
                    }
                    return carts;
                })
                .filter((item) => item.quantity !== 0);
            localStorage.setItem('cartItems', JSON.stringify(state.carts));
        },
    },
});

export const { AddCart, GetTotal, Increase, Decrease, RemoveCart, LoadCurrentProduct } = cartSlice.actions;
export default cartSlice.reducer;
