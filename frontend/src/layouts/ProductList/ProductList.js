import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './ProductList.module.scss';
import ProductItem from '../components/ProductItem/ProductItem';
import Loading from '../components/Loading/Loading';

const cx = classNames.bind(styles);

function ProductList(props) {
    const productData = useSelector((state) => state.product.productList);

    return (
        <div className="grid wide">
            <div className={`${cx('wrapper')}`}>
                <div className={cx('products-wrapper')}>
                    {productData.length > 0 ? (
                        <ul className={`${cx('product-list')} row`}>
                            {productData.map((product) => (
                                <li key={product._id} className={`${cx('product-item')} col l-${props.col}`}>
                                    <ProductItem
                                        id={product._id}
                                        name={product.name}
                                        author={product.author}
                                        image={product.image}
                                        back_image={product.back_image}
                                        price={product.price}
                                        sale={product.sale}
                                        topic={product.topic}
                                        type={product.type}
                                        description={product.description}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <Loading />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductList;
