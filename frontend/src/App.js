import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { AdminRoute, ProtectedRoute, adminRoutes, privateRoutes, publicRoutes } from '~/routes';
import { MainLayout } from '~/layouts';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import { setDataProduct, setDataProductSlider, setDataProductFeature } from './redux/productSlice';
import { setDataUser } from './redux/userSlice';
import { setDataOrder } from './redux/orderSlice';
import axios from 'axios';

function App() {
    const dispatch = useDispatch();
    const api = process.env.REACT_APP_SERVER_DOMIN;

    useEffect(() => {
        axios({
            method: 'get',
            url: `${api}/admin/books/slider`,
        }).then(function (res) {
            dispatch(setDataProductSlider(res.data));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        axios({
            method: 'get',
            url: `${api}/admin/books/feature`,
        }).then(function (res) {
            dispatch(setDataProductFeature(res.data));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        axios({
            method: 'get',
            url: `${api}/admin/users`,
        }).then(function (res) {
            dispatch(setDataUser(res.data));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        axios({
            method: 'get',
            url: `${api}/admin/books`,
        }).then(function (res) {
            dispatch(setDataProduct(res.data));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        axios({
            method: 'get',
            url: `${api}/order`,
        }).then(function (res) {
            dispatch(setDataOrder(res.data));
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Toaster />
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            let Layout = MainLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            const Page = route.component;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        {privateRoutes.map((route, index) => {
                            let Layout = MainLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            const Page = route.component;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <ProtectedRoute>
                                                <Page />
                                            </ProtectedRoute>
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        {adminRoutes.map((route, index) => {
                            let Layout = AdminLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            const Page = route.component;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <AdminRoute>
                                                <Page />
                                            </AdminRoute>
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
