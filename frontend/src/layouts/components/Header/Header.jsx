import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import TippyHeadless from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { useEffect, useState } from 'react';

import images from '~/assets/img';
import Button from '~/components/Button/Button';
import { CartIcon, LogOutIcon, SearchIcon, UserIcon, AdminIcon } from '~/components/Icons/Icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '~/redux/userSlice';
import { GetTotal } from '~/redux/cartSlice';

const cx = classNames.bind(styles);

function Header() {
    const mainNav = [
        {
            id: 1,
            title: 'Home',
            path: '/',
        },
        {
            id: 2,
            title: 'Books',
            path: '/catalog',
        },
        {
            id: 3,
            title: 'About Us',
            path: '/about',
        },
        {
            id: 4,
            title: 'Contact',
            path: '/contact',
        },
    ];

    // Shrink
    const [isShrink, setIsShrink] = useState(false);
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 100) {
                setIsShrink(true);
            } else {
                setIsShrink(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const dispatch = useDispatch();
    // handle user
    const userStorage = JSON.parse(localStorage.getItem('user'));
    const adminStorage = JSON.parse(sessionStorage.getItem('admin'));

    const currentUser = userStorage ? true : false;
    const adminUser = adminStorage ? true : false;

    const handleLogout = () => {
        dispatch(logoutRedux());
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    const { carts, quantity } = useSelector((item) => item.cart);
    useEffect(() => {
        dispatch(GetTotal());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [carts]);

    return (
        <>
            <header className={`${cx('wrapper')} ${cx(isShrink ? 'shrink' : '')}`}>
                <div className={`${cx('container')} grid wide`}>
                    <ul className={cx('nav')}>
                        {mainNav.map((nav) => (
                            <li key={nav.id} className={cx('nav-item')}>
                                <NavLink to={nav.path} className={({ isActive }) => cx(`${isActive ? 'active' : ''}`)}>
                                    {nav.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className={cx('action')}>
                        {currentUser || adminUser ? (
                            <>
                                {currentUser ? (
                                    <>
                                        <form className={cx('search-form')}>
                                            <input
                                                className={`${cx('search-input')} ${cx(
                                                    isSearch ? 'search-active' : '',
                                                )}`}
                                                type="text"
                                            />
                                            <input
                                                className={`${cx('search-form-value')} ${cx(
                                                    isSearch ? 'search-value-form-active' : '',
                                                )}`}
                                                type="submit"
                                                value={isSearch ? 'Search' : ''}
                                            />
                                        </form>
                                        <Tippy content="Find" placement="bottom">
                                            <button className={cx('search')} onClick={() => setIsSearch(!isSearch)}>
                                                <SearchIcon />
                                            </button>
                                        </Tippy>
                                        <Button to={'/cart'} className={cx('cart')}>
                                            <CartIcon />
                                        </Button>
                                        <span className={cx('quality')}>{quantity}</span>
                                    </>
                                ) : (
                                    <>
                                        <Button to={'/admin/dashboard'} className={cx('cart')}>
                                            <AdminIcon />
                                        </Button>
                                    </>
                                )}
                                <TippyHeadless
                                    interactive
                                    hideOnClick
                                    delay={[0, 1000]}
                                    placement="bottom-start"
                                    zIndex={99999}
                                    appendTo={document.body}
                                    render={(attrs) => (
                                        <div className="box" tabIndex="-1" {...attrs}>
                                            <PopperWrapper>
                                                <div className={cx('user_wrapper')} tabIndex="-1" {...attrs}>
                                                    <div className={cx('user_content')}>
                                                        <img src={images.user} alt="user" />
                                                        <div className={cx('user_info')}>
                                                            <div className={cx('username')}>
                                                                <p className={cx('username_label')}>User: </p>
                                                                <h3 className={`${cx('username_value')}`}>
                                                                    {currentUser ? userStorage.name : adminStorage.name}
                                                                </h3>
                                                            </div>
                                                            {/* <div className={cx('userphone')}>
                                                                <p className={cx('userphone_label')}>Phone: </p>
                                                                <h3 className={`${cx('userphone_value')}`}>
                                                                    {userData.phone}
                                                                </h3>
                                                            </div> */}
                                                            {currentUser ? (
                                                                <div className={cx('userdate')}>
                                                                    <p className={cx('userdate_label')}>Created: </p>
                                                                    <h3 className={`${cx('userdate_value')}`}>
                                                                        {userStorage.createdAt}
                                                                    </h3>
                                                                </div>
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Button primary leftIcon={<LogOutIcon />} onClick={handleLogout}>
                                                        <span className={cx('btn-title')}>Log out</span>
                                                    </Button>
                                                </div>
                                            </PopperWrapper>
                                        </div>
                                    )}
                                >
                                    <button className={cx('user')}>
                                        <UserIcon />
                                    </button>
                                </TippyHeadless>
                            </>
                        ) : (
                            <>
                                <Button className={cx('login-btn')} outline to={'/signin'}>
                                    SignIn
                                </Button>
                                <Button primary to={'/signup'}>
                                    SignUp
                                </Button>
                            </>
                        )}
                    </div>
                </div>
                <div className={`${cx('logo')} ${cx(isShrink ? 'logo-shrink' : '')}`}>
                    <img src={images.logo} alt="logo" />
                </div>
            </header>
        </>
    );
}

export default Header;
