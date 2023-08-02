import classNames from 'classnames/bind';

import images from '~/assets/img';
import styles from './Banner.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Banner() {
    return (
        <div className="grid wide">
            <div className={cx('wrapper')}>
                <Link to={'/catalog'}>
                    <img src={images.banner} alt="banner" />
                </Link>
            </div>
        </div>
    );
}

export default Banner;
