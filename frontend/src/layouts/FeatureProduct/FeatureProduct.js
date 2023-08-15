import classNames from 'classnames/bind';

import styles from './FeatureProduct.module.scss';
import ProductItem from '../components/ProductItem/ProductItem';
import Loading from '../components/Loading/Loading';

const cx = classNames.bind(styles);

function FeatureProduct(props) {
    return (
        <div className="grid wide">
            <div className={cx('products-wrapper')}>
                {props.value.length > 0 ? (
                    <ul className={`${cx('product-list')} row`}>
                        {props.value.map((product) => (
                            <li key={product._id} className={`${cx('product-item')} col ${props.col}`}>
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
    );
}

export default FeatureProduct;
