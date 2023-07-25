import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import styles from './SidebarAdmin.module.scss';
import images from '~/assets/img';
import { BackBtnIconMobile, MenuBarIcon } from '~/components/Icons/Icons';

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

    // responsive
    const [toggleMenuMobile, setToggleMenuMobile] = useState(false);
    const handleToggleMenuMobile = () => {
        setToggleMenuMobile(!toggleMenuMobile);
    };

    return (
        <>
            <div className={cx('sidebar', toggleMenuMobile ? 'mobile' : '')}>
                <div className={cx('back')} onClick={handleToggleMenuMobile}>
                    <BackBtnIconMobile />
                </div>
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
                                <li
                                    key={nav.id}
                                    className={cx('sidebar-item')}
                                    onClick={() => {
                                        setToggleMenuMobile(false);
                                    }}
                                >
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
            <div className={cx('toggle-sidebar')} onClick={handleToggleMenuMobile}>
                <MenuBarIcon />
            </div>
        </>
    );
}

export default SidebarAdmin;
