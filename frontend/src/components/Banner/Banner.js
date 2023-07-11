import classNames from 'classnames/bind';

import images from '~/assets/img';
import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

function Banner() {
    return (
        <div className="grid wide">
            <div className={cx('wrapper')}>
                <img src={images.banner} alt="banner" />
            </div>
        </div>
    );
}

export default Banner;
