import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';

import Button from '~/components/Button/Button';
import { CartIcon, MinusIcon, PlusIcon } from '~/components/Icons/Icons';
import { AddCart } from '~/redux/cartSlice';
import Loading from '~/layouts/components/Loading/Loading';
import styles from './ProductDetail.module.scss';

const cx = classNames.bind(styles);

function ProductDetail() {
    const params = useParams();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [params.id]);

    const api = process.env.REACT_APP_SERVER_DOMIN;

    const handleShowDetail = async (id) => {
        setLoading(true);
        let fetchData = await fetch(`${api}/books/${id}`);

        const dataRes = await fetchData.json();
        setValues({
            name: dataRes.name,
            author: dataRes.author,
            price: dataRes.price,
            sale: dataRes.sale,
            description: dataRes.description,
            image: dataRes.image,
            back_image: dataRes.back_image,
            topic: dataRes.topic,
            type: dataRes.type,
        });
        setLoading(false);

        setImageShow(dataRes.image);
    };

    const [descShow, setDescShow] = useState(false);
    const [values, setValues] = useState({
        name: '',
        author: '',
        price: 10,
        sale: 0,
        description: '',
        image: '',
        back_image: '',
        topic: [],
        type: [],
    });

    const [imageShow, setImageShow] = useState(values.image);
    const [checkType, setCheckType] = useState();
    const [quantity, setQuantity] = useState(1);

    const handlePlus = () => {
        setQuantity(quantity + 1);
    };

    const handleMinus = () => {
        if (quantity <= 1) {
            setQuantity(1);
        } else {
            setQuantity(quantity - 1);
        }
    };

    const check = () => {
        if (checkType === undefined) {
            alert('Choose Type of book please !!!');
            return false;
        }

        return true;
    };

    const addToCart = () => {
        if (check()) {
            const newItem = {
                name: values.name || '',
                author: values.author || '',
                quantity: quantity || '',
                price: values.price,
                image: values.image,
                type: checkType,
            };
            dispatch(AddCart(newItem));
        }
    };

    useEffect(() => {
        handleShowDetail(params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    return (
        <div className={cx('wrapper')}>
            <div className="grid wide">
                <div className="row">
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <div className={`${cx('image')} col l-6 m-6 c-12`}>
                                <div className={cx('img-list')}>
                                    <img src={values.image} alt="book" onClick={() => setImageShow(values.image)} />
                                    <img
                                        src={values.back_image}
                                        alt="book"
                                        onClick={() => setImageShow(values.back_image)}
                                    />
                                </div>
                                <div className={cx('img-main')}>
                                    <img src={imageShow} alt="book" />
                                </div>
                            </div>
                            <div className={`${cx('content')} col l-6 m-6 c-12`}>
                                <h1 className={cx('name')}>{values.name}</h1>
                                <div className={cx('group', 'author-group')}>
                                    <span>Author: </span>
                                    <span className={cx('value')}>{values.author}</span>
                                </div>
                                <div className={cx('group', 'price-group')}>
                                    <h2 className={cx('price')}>${values.sale}</h2>
                                    <h2 className={cx('sale')}>${values.price}</h2>
                                </div>
                                <div className={`${cx('desc', 'group', `${descShow ? 'show' : ''}`)}`}>
                                    <p>{values.description}</p>
                                    <Button primary className={cx('show-btn')} onClick={() => setDescShow(!descShow)}>
                                        {descShow ? 'collapse' : 'show more'}
                                    </Button>
                                </div>
                                <div className={cx('group')}>
                                    <span>Topic: </span>
                                    {values.topic.map((topic, index) => (
                                        <span key={index} className={cx('value')}>
                                            {index >= values.topic.length - 1 ? topic.concat('') : topic.concat(', ')}
                                        </span>
                                    ))}
                                </div>
                                <div className={cx('group')}>
                                    <span>Type of book cover: </span>
                                    <div className={cx('action')}>
                                        {values.type.map((type, index) => (
                                            <label key={index}>
                                                <input
                                                    type="radio"
                                                    className={cx('input-checkbox')}
                                                    checked={checkType === type}
                                                    onChange={() => setCheckType(type)}
                                                />
                                                {type}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <span>Quantity: </span>
                                <div className={cx('group', 'btn-group')}>
                                    <div className={cx('quantity')}>
                                        <span className={cx('quantity_btn')} onClick={handleMinus}>
                                            <MinusIcon />
                                        </span>
                                        <span className={cx('quantity_input')}>{quantity}</span>
                                        <span className={cx('quantity_btn')} onClick={handlePlus}>
                                            <PlusIcon />
                                        </span>
                                    </div>
                                    <Button primary large onClick={addToCart}>
                                        <span className={cx('btn-icon')}>
                                            <CartIcon />
                                        </span>
                                        Add to cart
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
