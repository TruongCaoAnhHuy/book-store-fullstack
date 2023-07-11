import classNames from 'classnames/bind';

import ProductList from '~/layouts/ProductList/ProductList';
import Sidebar from '~/layouts/Sidebar/Sidebar';
import styles from './Catalog.module.scss';

const cx = classNames.bind(styles);

function Catalog() {
    return (
        <div className={cx('wrapper')}>
            <div className="grid wide">
                <div className="row">
                    <div className="col l-3">
                        <Sidebar />
                    </div>
                    <div className="col l-9">
                        <ProductList col={'3'} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Catalog;
