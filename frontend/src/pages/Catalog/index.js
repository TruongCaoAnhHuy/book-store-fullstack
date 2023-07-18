import classNames from 'classnames/bind';
import { useLayoutEffect, useState, useEffect } from 'react';

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
                    <div className="col l-9">
                        <ProductList col={'3'} value={value} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Catalog;
