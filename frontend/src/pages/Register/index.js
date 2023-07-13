import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useLayoutEffect } from 'react';
import { toast } from 'react-hot-toast';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button/Button';
import { BackBtnIcon, FaceBookIcon, GoogleIcon } from '~/components/Icons/Icons';
import styles from './Register.module.scss';

const cx = classNames.bind(styles);

function Register() {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });

    const navigative = useNavigate();

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        cPass: '',
        phone: '',
    });

    const regexPass = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d).{8,}$/;
    const [errorMsg, setErrorMsg] = useState('');

    const api = process.env.REACT_APP_SERVER_DOMIN;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!values.name || !values.email || !values.password || !values.cPass || !values.phone) {
            setErrorMsg('Fill all fields !!!');
            return;
        }
        if (values.name.length < 6) {
            setErrorMsg('UserName must >= 6 characters');
            return;
        }
        if (!regexPass.test(values.password)) {
            setErrorMsg(
                'Password >= 8 characters and contain at least 1 capital letter, 1 number and 1 special character',
            );
            return;
        }
        if (values.cPass !== values.password) {
            setErrorMsg('Incorrect password');
            return;
        }
        if (isNaN(values.phone) || values.phone.length < 10) {
            setErrorMsg('PhoneNumber must be numbers & > 10 numbers');
            return;
        } else {
            const fetchData = await fetch(`${api}/signup`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await fetchData.json();
            // alert(data.message);
            toast(data.message);
            if (data.alert) {
                navigative('/signin');
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <PopperWrapper className={cx('popper-wrapper')}>
                <div className={cx('header')}>
                    <Link to={'/'} className={cx('back-btn')}>
                        <BackBtnIcon />
                    </Link>
                    <h2 className={cx('title')}>Sign Up</h2>
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
                        <label className={cx('label')} htmlFor="name_id">
                            User Name
                        </label>
                        <input
                            className={cx('input')}
                            type="text"
                            id="name_id"
                            placeholder="Enter your name"
                            onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
                        />
                    </div>
                    <div className={cx('field-wrapper')}>
                        <label className={cx('label')} htmlFor="email_id">
                            Email Address
                        </label>
                        <input
                            className={cx('input')}
                            type="email"
                            id="email_id"
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
                    <div className={cx('field-wrapper')}>
                        <label className={cx('label')} htmlFor="cpass_id">
                            Confirm Password
                        </label>
                        <input
                            className={cx('input')}
                            type="password"
                            id="cpass_id"
                            placeholder="Confirm your password"
                            onChange={(e) => setValues((prev) => ({ ...prev, cPass: e.target.value }))}
                        />
                    </div>
                    <div className={cx('field-wrapper')}>
                        <label className={cx('label')} htmlFor="phone_id">
                            Phone Number
                        </label>
                        <input
                            className={cx('input')}
                            type="text"
                            id="phone_id"
                            placeholder="Enter your phone numbers"
                            onChange={(e) => setValues((prev) => ({ ...prev, phone: e.target.value }))}
                        />
                    </div>
                    <div className={cx('footer-form')}>
                        <span className={cx('error-message')}>{errorMsg}</span>
                        <Button primary className={cx('continue-btn')}>
                            Continue
                        </Button>
                    </div>
                </form>
                <div className={cx('footer')}>
                    <span>Already have an account ?</span>
                    <Link to={'/signin'}>Sign In</Link>
                </div>
            </PopperWrapper>
        </div>
    );
}

export default Register;
