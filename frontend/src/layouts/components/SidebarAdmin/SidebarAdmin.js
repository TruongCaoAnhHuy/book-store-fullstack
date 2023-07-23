import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './SidebarAdmin.module.scss';
import images from '~/assets/img';

const cx = classNames.bind(styles);

function SidebarAdmin() {
    const navs = [
        // {
        //     id: 1,
        //     title: 'Dashboard',
        //     icon: faChartBar,
        //     path: '/admin/dashboard',
        // },
        {
            id: 2,
            title: 'Books',
            icon: faBook,
            path: '/admin/books',
        },
        {
            id: 3,
            title: 'Users',
            icon: faUser,
            path: '/admin/users',
        },
        {
            id: 4,
            title: 'Orders',
            icon: faCartShopping,
            path: '/admin/orders',
        },
    ];
    return (
        <div className={cx('sidebar')}>
            <div className={cx('sidebar-wrapper')}>
                <div className={cx('sidebar-header')}>
                    <Link to={'/'}>
                        <img src={images.logo_footer} alt="book-store" />
                    </Link>
                    <p className={cx('sidebar-header_title')}>
                        <span>Book</span>store
                    </p>
                </div>
                <div className={cx('sidebar-content')}>
                    <ul className={cx('sidebar-list')}>
                        {navs.map((nav) => (
                            <li key={nav.id} className={cx('sidebar-item')}>
                                <NavLink
                                    to={nav.path}
                                    className={({ isActive }) => cx(`${isActive ? 'active' : ''}`, 'item-link')}
                                >
                                    <FontAwesomeIcon icon={nav.icon} className={cx('icon-link')} />
                                    {nav.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SidebarAdmin;
