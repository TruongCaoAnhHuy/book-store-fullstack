import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import Banner from '~/components/Banner/Banner';
import Slider from '~/layouts/components/Slider/Slider';
import FeatureProduct from '~/layouts/FeatureProduct/FeatureProduct';
import styles from './Home.module.scss';
import Introduce from '~/layouts/components/Introduce/Introduce';

const cx = classNames.bind(styles);

function Home() {
    const productData = useSelector((state) => state.product.productFeatureList);

    // useLayoutEffect(() => {
    //     window.scrollTo(0, 0);
    // }, []);

    return (
        <>
            <div className={cx('product')}>
                <Introduce />
                <h1 className={cx('title')}>Top Products</h1>
                <Slider />
                <div className={cx('banner')}>
                    <Banner />
                </div>
                <h1 className={cx('title')}>Featured Products</h1>
                <FeatureProduct col={'l-2-4 m-3 c-9'} value={productData} />
            </div>
        </>
    );
}

export default Home;
