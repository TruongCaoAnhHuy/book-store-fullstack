const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
    user: [],
    name: '',
    email: '',
    phone: '',
    createdAt: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            state.name = action.payload.data.name;
            state.email = action.payload.data.email;
            state.phone = action.payload.data.phone;
            state.createdAt = action.payload.data.createdAt;
        },

        loginAdminRedux: (state, action) => {
            state.name = action.payload.data.name;
            state.email = action.payload.data.email;
            state.phone = action.payload.data.phone;
            state.createdAt = action.payload.data.createdAt;
            sessionStorage.setItem('admin', JSON.stringify(state));
        },

        logoutRedux: (state, action) => {
            state.name = '';
            state.email = '';
            state.phone = '';
            state.createdAt = '';
            localStorage.removeItem('user');
            localStorage.removeItem('cartItems');
            sessionStorage.removeItem('admin');
        },

        setDataUser: (state, action) => {
            state.user = [...action.payload];
        },
    },
});

export const { loginRedux, logoutRedux, loginAdminRedux, setDataUser } = userSlice.actions;

export default userSlice.reducer;
