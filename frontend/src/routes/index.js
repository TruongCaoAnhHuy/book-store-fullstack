import Home from '~/pages/Home';
import Catalog from '~/pages/Catalog';
import Login from '~/pages/Login';
import Cart from '~/pages/Cart';
import Register from '~/pages/Register';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Dashboard from '~/pages/Dashboard';
import Book from '~/pages/Book';
import User from '~/pages/User';
import CreateBook from '~/pages/CreateBook';
import EditBook from '~/pages/EditBook';
import CreateUser from '~/pages/CreateUser';
import EditUser from '~/pages/EditUser';
import ProductDetail from '~/pages/ProductDetail';

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
    { path: '/catalog', component: Catalog },
    { path: '/signin', component: Login, layout: null },
    { path: '/signup', component: Register, layout: null },
    { path: '/about', component: Home },
    { path: '/contact', component: Home },
    { path: '/books/:id', component: ProductDetail },

    { path: '/', component: Home },
];

const privateRoutes = [{ path: '/cart', component: Cart, protected: ProtectedRoute }];

const adminRoutes = [
    { path: '/admin/dashboard', component: Dashboard, protected: ProtectedRoute },
    { path: '/admin/books', component: Book, protected: ProtectedRoute },
    { path: '/admin/books/create', component: CreateBook, protected: ProtectedRoute },
    { path: '/admin/books/edit/:id', component: EditBook, protected: ProtectedRoute },
    { path: '/admin/users', component: User, protected: ProtectedRoute },
    { path: '/admin/users/create', component: CreateUser, protected: ProtectedRoute },
    { path: '/admin/users/edit/:id', component: EditUser, protected: ProtectedRoute },
    { path: '/admin/orders', component: Book, protected: ProtectedRoute },
];

export { publicRoutes, privateRoutes, adminRoutes };
