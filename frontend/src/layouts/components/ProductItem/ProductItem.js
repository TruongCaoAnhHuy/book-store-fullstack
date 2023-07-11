import classNames from 'classnames/bind';
import { useState } from 'react';

import Button from '~/components/Button/Button';
import styles from './ProductItem.module.scss';
import { CartIcon } from '~/components/Icons/Icons';
import { Link } from 'react-router-dom';
import ProductModal from '~/layouts/ProductModal/ProductModal';

const cx = classNames.bind(styles);

function ProductItem(props, { className }) {
    const classes = cx('wrapper', {
        [className]: className,
    });
    const [isHover, setIsHover] = useState(false);
    const [isModal, setIsModal] = useState(false);

    return (
        <>
            <div className={classes}>
                <div
                    className={cx('product-info')}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                >
                    <Link to={`/books/${props.id}`}>
                        {isHover ? (
                            <img
                                className={cx('product-img', isHover ? 'fade-in' : 'fade-out')}
                                src={props.back_image}
                                alt="book"
                            />
                        ) : (
                            <img className={cx('product-img', isHover ? 'fade-in' : '')} src={props.image} alt="book" />
                        )}
                    </Link>
                    <Link to={`/books/${props.id}`}>
                        <p className={cx('product-name')}>{props.name}</p>
                    </Link>
                    <p className={cx('product-desc')}>{props.description}</p>
                </div>
                <div className={cx('product-interact')}>
                    <p>
                        <span className={cx('product-sale')}>${props.sale}</span>
                        <span className={cx('product-price')}>${props.price}</span>
                    </p>
                    <Button
                        className={cx('product-btn')}
                        small
                        type="submit"
                        to={props.to}
                        onClick={() => setIsModal(!isModal)}
                    >
                        <CartIcon />
                    </Button>
                </div>
            </div>
            {isModal ? (
                <>
                    <ProductModal value={props}>
                        <Button primary className={cx('close_btn')} onClick={() => setIsModal(!isModal)}>
                            Đóng
                        </Button>
                    </ProductModal>
                </>
            ) : (
                <></>
            )}
        </>
    );
}

export default ProductItem;
