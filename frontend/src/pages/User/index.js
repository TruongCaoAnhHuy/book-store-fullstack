import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit, faTrash, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { useSelector } from 'react-redux';
import { useLayoutEffect } from 'react';

import styles from './User.module.scss';
import Button from '~/components/Button/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function User() {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });

    const userData = useSelector((state) => state.user.user);

    const api = process.env.REACT_APP_SERVER_DOMIN;

    const handleClickDelete = async (id) => {
        const answer = window.confirm('Do you wanna delete product ?');
        if (answer) {
            let fetchData = await fetch(`${api}/admin/users/delete/${id}`, {
                method: 'DELETE',
            });

            const dataRes = await fetchData.json();
            if (dataRes) {
                window.location.reload();
            }
        } else {
            return;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className="row">
                <div className="col l-12">
                    <PopperWrapper>
                        <header className={cx('header')}>
                            <h2 className={cx('title')}>User List</h2>
                            <Button to={'/admin/users/create'} primary className={cx('btn-add')}>
                                Add new user
                            </Button>
                        </header>
                        <div className={cx('body')}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className={cx('table-col')}>#</th>
                                        <th className={cx('table-col')}>User Name</th>
                                        <th className={cx('table-col', 'hidden')}>User Email</th>
                                        <th className={cx('table-col', 'hidden')}>User Phone</th>
                                        <th className={cx('table-col', 'hidden')}>Created</th>
                                        <th className={cx('table-col')}>Admin</th>
                                        <th className={cx('table-col')}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.map((user, index) => (
                                        <tr key={index}>
                                            <th className={cx('table-col')}>{index + 1}</th>
                                            <td className={cx('table-col')}>{user.name}</td>
                                            <td className={cx('table-col', 'hidden')}>{user.email}</td>
                                            <td className={cx('table-col', 'hidden')}>{user.phone}</td>
                                            <td className={cx('table-col', 'hidden')}>{user.createdAt}</td>
                                            <td className={cx('table-col')}>
                                                {user.isAdmin ? (
                                                    <FontAwesomeIcon className={cx('admin')} icon={faCheckCircle} />
                                                ) : (
                                                    <FontAwesomeIcon className={cx('no-admin')} icon={faXmarkCircle} />
                                                )}
                                            </td>
                                            <td className={cx('table-col')}>
                                                <Tippy content="Edit" placement="bottom">
                                                    <Link
                                                        to={`/admin/users/edit/${user._id}`}
                                                        className={cx('action-btn')}
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Link>
                                                </Tippy>
                                                <Tippy content="Remove" placement="bottom">
                                                    <button
                                                        className={cx('action-btn')}
                                                        onClick={() => handleClickDelete(user._id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </Tippy>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </PopperWrapper>
                </div>
            </div>
        </div>
    );
}

export default User;
