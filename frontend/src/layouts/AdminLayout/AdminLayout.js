import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';

import SidebarAdmin from '../components/SidebarAdmin/SidebarAdmin';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <SidebarAdmin />
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default AdminLayout;
