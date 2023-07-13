import classNames from 'classnames/bind';
import { useLayoutEffect } from 'react';

import Banner from '~/components/Banner/Banner';
import ProductList from '~/layouts/ProductList/ProductList';
import styles from './Home.module.scss';
import Slider from '~/layouts/components/Slider/Slider';

const cx = classNames.bind(styles);

function Home() {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <>
            <div className={cx('product')}>
                <Slider />
                <div className={cx('banner')}>
                    <Banner />
                </div>
                <h1 className={cx('title')}>Featured Products</h1>
                <ProductList col={'2-4'} />
            </div>
        </>
    );
}

export default Home;
