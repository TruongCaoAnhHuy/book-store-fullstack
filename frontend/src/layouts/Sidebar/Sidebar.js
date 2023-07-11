import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('author-check')}>
                <h2 className={cx('title')}>Author</h2>
                <ul className={cx('check-list')}>
                    <li className={cx('check-item')}>
                        <label className={cx('label')}>
                            <input type="checkbox" />
                            Anh Huy
                        </label>
                    </li>
                    <li className={cx('check-item')}>
                        <label className={cx('label')}>
                            <input type="checkbox" />
                            Anh Huy
                        </label>
                    </li>
                    <li className={cx('check-item')}>
                        <label className={cx('label')}>
                            <input type="checkbox" />
                            Anh Huy
                        </label>
                    </li>
                </ul>
            </div>
            <div className={cx('author-check')}>
                <h2 className={cx('title')}>Topic</h2>
                <ul className={cx('check-list')}>
                    <li className={cx('check-item')}>
                        <label className={cx('label')}>
                            <input type="checkbox" />
                            Anh Huy
                        </label>
                    </li>
                    <li className={cx('check-item')}>
                        <label className={cx('label')}>
                            <input type="checkbox" />
                            Anh Huy
                        </label>
                    </li>
                    <li className={cx('check-item')}>
                        <label className={cx('label')}>
                            <input type="checkbox" />
                            Anh Huy
                        </label>
                    </li>
                </ul>
            </div>
            <div className={cx('author-check')}>
                <h2 className={cx('title')}>Book Cover</h2>
                <ul className={cx('check-list')}>
                    <li className={cx('check-item')}>
                        <label className={cx('label')}>
                            <input type="checkbox" />
                            Hardcover
                        </label>
                    </li>
                    <li className={cx('check-item')}>
                        <label className={cx('label')}>
                            <input type="checkbox" />
                            Paperback
                        </label>
                    </li>
                </ul>
            </div>
            <Button primary>Clear checked</Button>
        </div>
    );
}

export default Sidebar;
