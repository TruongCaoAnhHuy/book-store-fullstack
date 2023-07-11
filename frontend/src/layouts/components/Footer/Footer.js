import classNames from 'classnames/bind';

import styles from './Footer.module.scss';
import images from '~/assets/img';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className="grid wide">
                <div className="row">
                    <div className="col l-4">
                        <h1 className={cx('title')}>Information</h1>
                        <ul className={cx('nav-list')}>
                            <li className={cx('nav-item')}>
                                <Link to={'/'} className={cx('nav-item-link')}>
                                    Home
                                </Link>
                            </li>
                            <li className={cx('nav-item')}>
                                <Link to={'/catalog'} className={cx('nav-item-link')}>
                                    Books
                                </Link>
                            </li>
                            <li className={cx('nav-item')}>
                                <Link to={'/'} className={cx('nav-item-link')}>
                                    About Us
                                </Link>
                            </li>
                            <li className={cx('nav-item')}>
                                <Link to={'/'} className={cx('nav-item-link')}>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col l-4">
                        <h1 className={cx('title')}>Contact</h1>
                        <ul className={cx('nav-list')}>
                            <li className={cx('nav-item')}>
                                Contact to order: <span>0123456789</span>
                            </li>
                            <li className={cx('nav-item')}>
                                Order problems: <span>0123456789</span>
                            </li>
                            <li className={cx('nav-item')}>
                                Comments, complaints: <span>0123456789</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col l-4">
                        <img className={cx('logo-footer')} src={images.logo_footer} alt="logo" />
                        <div className={cx('content-footer')}>
                            <p>
                                Tại Book-Store, chúng tôi cam kết cung cấp cho bạn những trải nghiệm đọc sách tuyệt vời
                                nhất. Với không gian mở rộng và thiết kế thoải mái, bạn có thể dạo quanh các kệ sách đầy
                                màu sắc và chọn lựa những tác phẩm yêu thích của mình. Chúng tôi không chỉ có sách văn
                                học kinh điển, tiểu thuyết, mà còn cung cấp cả sách khoa học, lịch sử, nghệ thuật, kinh
                                doanh, và rất nhiều thể loại khác. Bất kể bạn là một người đam mê tiểu thuyết, muốn tìm
                                hiểu về khoa học hay đang tìm kiếm kiến thức chuyên ngành, chúng tôi sẽ đáp ứng mọi yêu
                                cầu của bạn.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
