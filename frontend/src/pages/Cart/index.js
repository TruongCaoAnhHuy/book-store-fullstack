import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { useLayoutEffect, useEffect, useState } from 'react';

import styles from './Cart.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button/Button';
import { DeleteIcon, MinusIcon, PlusIcon } from '~/components/Icons/Icons';
import { Decrease, GetTotal, Increase, RemoveCart } from '~/redux/cartSlice';

const cx = classNames.bind(styles);

function Cart() {
    const { carts, total, quantity } = useSelector((item) => item.cart);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(GetTotal());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [carts]);

    const cartLocalstorage = JSON.parse(localStorage.getItem('cartItems'));
    const userLocalstorage = JSON.parse(localStorage.getItem('user'));

    const [test, setTest] = useState('');

    const api = process.env.REACT_APP_SERVER_DOMIN;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fetchData = await fetch(`${api}/order/${userLocalstorage.id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(cartLocalstorage),
        });
        const dataRes = await fetchData.json();
        console.log(dataRes);
    };

    return (
        <div className="grid wide">
            <div className={cx('wrapper')}>
                <div className="row">
                    <div className="col l-4">
                        <div className={cx('info')}>
                            <PopperWrapper className={cx('info-wrapper')}>
                                <p className={cx('title')}>
                                    You have <span>{quantity}</span> product in your cart
                                </p>
                                <div className={cx('price')}>
                                    <p className={cx('price-label')}>Total:</p>
                                    <h2 className={cx('price-value')}>${total}</h2>
                                </div>
                                <form onSubmit={(e) => handleSubmit(e)}>
                                    <input value={test} onChange={(e) => setTest(e.target.value)} />
                                    <Button primary large className={cx('info-btn')}>
                                        Submit an order
                                    </Button>
                                </form>
                                <Button to={'/catalog'} primary large className={cx('info-btn')}>
                                    Shop further
                                </Button>
                            </PopperWrapper>
                        </div>
                    </div>
                    <div className="col l-8">
                        <div className={cx('cart')}>
                            <ul className={cx('cart-list')}>
                                {cartLocalstorage?.map((product, index) => (
                                    <li className={cx('cart-item')} key={index}>
                                        <div className={cx('cart-img')}>
                                            <img src={product.image} alt="book" />
                                        </div>
                                        <div className={cx('cart-info')}>
                                            <p className={cx('cart-name')}>{product.name}</p>
                                            <p className={cx('cart-price')}>${product.price}</p>
                                            <p className={cx('cart-type')}>{product.type}</p>
                                            <div className={cx('quantity')}>
                                                <span
                                                    className={cx('quantity-btn')}
                                                    onClick={() => dispatch(Decrease([product.name, product.type]))}
                                                >
                                                    <MinusIcon />
                                                </span>
                                                <span className={cx('quantity-input')}>{product.quantity}</span>
                                                <span
                                                    className={cx('quantity-btn')}
                                                    onClick={() => dispatch(Increase([product.name, product.type]))}
                                                >
                                                    <PlusIcon />
                                                </span>
                                            </div>
                                            <span
                                                className={cx('cart-delete')}
                                                onClick={() => dispatch(RemoveCart([product.name, product.type]))}
                                            >
                                                <DeleteIcon />
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
