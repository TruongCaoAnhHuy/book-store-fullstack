import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Home from '~/pages/Home';
import Catalog from '~/pages/Catalog';
import Login from '~/pages/Login';
import Cart from '~/pages/Cart';
import Register from '~/pages/Register';
import Book from '~/pages/Book';
import User from '~/pages/User';
import CreateBook from '~/pages/CreateBook';
import EditBook from '~/pages/EditBook';
import CreateUser from '~/pages/CreateUser';
import EditUser from '~/pages/EditUser';
import ProductDetail from '~/pages/ProductDetail';
import Order from '~/pages/Order';

export const ProtectedRoute = ({ children }) => {
    const currentUser = localStorage.getItem('user');
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/signin');
        }
    }, [currentUser, navigate]);

    return <>{children}</>;
};

export const AdminRoute = ({ children }) => {
    const currentUser = sessionStorage.getItem('admin');
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/signin');
        }
    }, [currentUser, navigate]);

    return <>{children}</>;
};

const publicRoutes = [
    { path: '/signin', component: Login, layout: null },
    { path: '/signup', component: Register, layout: null },

    { path: '/catalog/:id', component: Catalog },
    { path: '/catalog', component: Catalog },

    { path: '/about/:id', component: Home },
    { path: '/about', component: Home },

    { path: '/contact/:id', component: Home },
    { path: '/contact', component: Home },

    { path: '/books/:id', component: ProductDetail },

    { path: '/:id', component: Home },

    { path: '/', component: Home },
];

const privateRoutes = [
    { path: '/cart/:id', component: Cart, protected: ProtectedRoute },
    { path: '/cart', component: Cart, protected: ProtectedRoute },
];

const adminRoutes = [
    { path: '/admin/books', component: Book, protected: ProtectedRoute },
    { path: '/admin/books/create', component: CreateBook, protected: ProtectedRoute },
    { path: '/admin/books/edit/:id', component: EditBook, protected: ProtectedRoute },
    { path: '/admin/users', component: User, protected: ProtectedRoute },
    { path: '/admin/users/create', component: CreateUser, protected: ProtectedRoute },
    { path: '/admin/users/edit/:id', component: EditUser, protected: ProtectedRoute },
    { path: '/admin/orders', component: Order, protected: ProtectedRoute },
];

export { publicRoutes, privateRoutes, adminRoutes };
