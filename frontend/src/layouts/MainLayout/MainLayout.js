import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div className={cx('wrapper')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </>
    );
}

export default DefaultLayout;
