import classNames from 'classnames/bind';
import { useEffect, useState, useLayoutEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button/Button';
import styles from './EditUser.module.scss';

const cx = classNames.bind(styles);

function EditUser() {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });

    const navigative = useNavigate();
    let params = useParams();

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        isAdmin: false,
    });

    const regexPass = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*\d).{8,}$/;

    const api = process.env.REACT_APP_SERVER_DOMIN;

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        if (!values.name || !values.email || !values.password || !values.phone) {
            toast('Fill all fields !!!');
            return;
        }
        if (values.name.length < 6) {
            toast('UserName must >= 6 characters');
            return;
        }
        if (!regexPass.test(values.password)) {
            toast('Password >= 8 characters and contain at least 1 capital letter, 1 number and 1 special character');
            return;
        }
        if (isNaN(values.phone) || values.phone.length < 10) {
            toast('PhoneNumber must be numbers & > 10 numbers');
            return;
        } else {
            const fetchData = await fetch(`${api}/admin/users/update/${id}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await fetchData.json();
            toast(data.message);
            if (data.alert) {
                navigative('/admin/users');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        }
    };

    const handleCheckAdmin = (e) => {
        if (!values.isAdmin) {
            const answer = window.confirm('This user is Admin ?');
            if (answer) {
                setValues((prev) => ({ ...prev, isAdmin: e.target.checked }));
                return;
            } else {
                return;
            }
        } else {
            setValues((prev) => ({ ...prev, isAdmin: e.target.checked }));
        }
    };

    const handleClickEdit = async (id) => {
        let fetchData = await fetch(`http://localhost:3002/admin/users/edit/${id}`, {
            method: 'POST',
        });

        const dataRes = await fetchData.json();
        setValues({
            name: dataRes.name,
            email: dataRes.email,
            phone: dataRes.phone,
            password: dataRes.password,
            isAdmin: dataRes.isAdmin,
        });
    };

    useEffect(() => {
        handleClickEdit(params.id);
    }, [params.id]);

    return (
        <div className={cx('wrapper')}>
            <PopperWrapper>
                <header className={cx('header')}>
                    <h2 className={cx('title')}>User Edit</h2>
                </header>
                <div className={cx('body')}>
                    <form onSubmit={(e) => handleSubmit(e, params.id)}>
                        <div className={cx('form-group')}>
                            <label htmlFor="name">User Name:</label>
                            <input
                                id="name"
                                placeholder="User Name..."
                                value={values.name}
                                onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="email">User Email:</label>
                            <input
                                id="email"
                                placeholder="User Email..."
                                value={values.email}
                                onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="phone">User Phone:</label>
                            <input
                                id="phone"
                                placeholder="User Phone..."
                                value={values.phone}
                                onChange={(e) => setValues((prev) => ({ ...prev, phone: e.target.value }))}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="pass">User Password:</label>
                            <input
                                id="pass"
                                type="password"
                                placeholder="User Password..."
                                value={values.password}
                                onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))}
                            />
                        </div>
                        <div className={cx('action')}>
                            <div className={cx('form-group')}>
                                <label>
                                    Admin
                                    <input
                                        type="checkbox"
                                        className={cx('input-checkbox')}
                                        checked={values.isAdmin}
                                        onChange={(e) => handleCheckAdmin(e)}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className={cx('form-group', 'btn-group')}>
                            <Button primary className={cx('btn-action')}>
                                Save
                            </Button>
                            <Button red className={cx('btn-action')}>
                                Reset
                            </Button>
                        </div>
                    </form>
                </div>
            </PopperWrapper>
        </div>
    );
}

export default EditUser;
