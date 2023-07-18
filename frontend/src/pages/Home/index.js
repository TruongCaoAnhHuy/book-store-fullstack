import classNames from 'classnames/bind';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

import Banner from '~/components/Banner/Banner';
import styles from './Home.module.scss';
import Slider from '~/layouts/components/Slider/Slider';
import FeatureProduct from '~/layouts/FeatureProduct/FeatureProduct';

const cx = classNames.bind(styles);

function Home() {
    const productData = useSelector((state) => state.product.productFeatureList);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className={cx('product')}>
                <Slider />
                <div className={cx('banner')}>
                    <Banner />
                </div>
                <h1 className={cx('title')}>Featured Products</h1>
                <FeatureProduct col={'2-4'} value={productData} />
            </div>
        </>
    );
}

export default Home;
