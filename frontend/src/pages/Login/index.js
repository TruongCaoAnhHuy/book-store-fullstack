import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useLayoutEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button/Button';
import { BackBtnIcon, FaceBookIcon, GoogleIcon } from '~/components/Icons/Icons';
import styles from './Login.module.scss';
import { loginRedux } from '~/redux/userSlice';
import Loading from '~/layouts/components/Loading/Loading';
import Modal from '~/components/Modal/Modal';

const cx = classNames.bind(styles);

function Login() {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });

    const navigative = useNavigate();

    const [loading, setLoading] = useState(false);

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const dispatch = useDispatch();

    const api = process.env.REACT_APP_SERVER_DOMIN;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = values;
        if (email && password) {
            setLoading(true);
            const fetchData = await fetch(`${api}/signin`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const dataRes = await fetchData.json();
            toast(dataRes.message);
            if (dataRes.alert) {
                setLoading(false);
                dispatch(loginRedux(dataRes));

                if (dataRes.data.isAdmin) {
                    localStorage.removeItem('user');
                    sessionStorage.setItem('admin', JSON.stringify(dataRes.data));
                    navigative('/');
                } else {
                    localStorage.setItem('user', JSON.stringify(dataRes.data));
                    navigative('/');
                    sessionStorage.removeItem('admin');
                }
            }
        } else {
            alert('Fill all fields !!!');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <PopperWrapper className={cx('popper-wrapper')}>
                <div className={cx('header')}>
                    <Link to={'/'} className={cx('back-btn')}>
                        <BackBtnIcon />
                    </Link>
                    <h2 className={cx('title')}>Sign In</h2>
                </div>
                <div className={cx('social-btn')}>
                    <Button social className={cx('google-btn')}>
                        <GoogleIcon />
                        <span className={cx('social-label')}>Google</span>
                    </Button>
                    <Button social className={cx('facebook-btn')}>
                        <FaceBookIcon />
                        <span className={cx('social-label')}>FaceBook</span>
                    </Button>
                </div>
                <form className={cx('info-form')} onSubmit={(e) => handleSubmit(e)}>
                    <div className={cx('field-wrapper')}>
                        <label className={cx('label')} htmlFor="email_id">
                            Email Address
                        </label>
                        <input
                            className={cx('input')}
                            type="email"
                            id="email_id"
                            name="email"
                            placeholder="Enter your email"
                            onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
                        />
                    </div>
                    <div className={cx('field-wrapper')}>
                        <label className={cx('label')} htmlFor="pass_id">
                            Password
                        </label>
                        <input
                            className={cx('input')}
                            type="password"
                            id="pass_id"
                            placeholder="Enter your password"
                            onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))}
                        />
                    </div>
                    <div className={cx('footer-form')}>
                        <span className={cx('error-message')}></span>
                        <Button primary className={cx('continue-btn')}>
                            Continue
                        </Button>
                    </div>
                </form>
                <div className={cx('footer')}>
                    <span>Don't have an account ?</span>
                    <Link to={'/signup'}>Sign Up</Link>
                </div>
            </PopperWrapper>
            {loading ? (
                <Modal>
                    <Loading />
                </Modal>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Login;
