import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useEffect, useCallback, useState } from 'react';

import styles from './ProductList.module.scss';
import ProductItem from '../components/ProductItem/ProductItem';
import Loading from '../components/Loading/Loading';

const cx = classNames.bind(styles);

function ProductList(props) {
    const productData = useSelector((state) => state.product.productList);
    const [newList, setNewList] = useState(productData);

    useEffect(() => {
        setNewList(productData);
    }, [productData]);

    const updateProductList = useCallback(() => {
        let temp = productData;
        if (props.value[0].length > 0) {
            temp = temp.filter((item) => props.value[0].includes(item.author));
        }

        if (props.value[1].length > 0) {
            temp = temp.filter((item) => {
                const check = item.topic.find((topic) => props.value[1].includes(topic));
                return check !== undefined;
            });
        }

        setNewList(temp);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    useEffect(() => {
        updateProductList();
    }, [updateProductList]);

    return (
        <div className="grid wide">
            <div className={`${cx('wrapper')}`}>
                <div className={cx('products-wrapper')}>
                    {productData.length > 0 ? (
                        <ul className={`${cx('product-list')} row`}>
                            {newList.map((product) => (
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
        </div>
    );
}

export default ProductList;
