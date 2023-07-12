import classNames from 'classnames/bind';

import Banner from '~/components/Banner/Banner';
import ProductList from '~/layouts/ProductList/ProductList';
import styles from './Home.module.scss';
import Slider from '~/layouts/components/Slider/Slider';

const cx = classNames.bind(styles);

function Home() {
    const api = process.env.REACT_APP_SERVER_DOMIN;
    console.log(String(api));
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
