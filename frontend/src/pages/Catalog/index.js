import classNames from 'classnames/bind';
import { useLayoutEffect, useState } from 'react';

import ProductList from '~/layouts/ProductList/ProductList';
import Sidebar from '~/layouts/Sidebar/Sidebar';
import styles from './Catalog.module.scss';

const cx = classNames.bind(styles);

function Catalog() {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [checkedAuthor, setCheckedAuthor] = useState([]);
    const [checkTopic, setCheckedTopic] = useState([]);

    const value = [checkedAuthor, checkTopic];

    const ConsoleParent = (author, topic) => {
        setCheckedAuthor([...author]);
        setCheckedTopic([...topic]);
    };

    return (
        <div className={cx('wrapper')}>
            <div className="grid wide">
                <div className="row">
                    <div className="col l-3">
                        <Sidebar ConsoleParent={ConsoleParent} />
                    </div>
                    <div className="col l-9 m-12 c-12">
                        <ProductList col={'l-3 m-3 c-8'} value={value} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Catalog;
