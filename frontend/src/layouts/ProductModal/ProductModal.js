import classNames from 'classnames/bind';
import { useState } from 'react';

import Modal from '~/components/Modal/Modal';
import styles from './ProductModal.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button/Button';
import { CartIcon, MinusIcon, PlusIcon } from '~/components/Icons/Icons';

const cx = classNames.bind(styles);

function ProductModal(props) {
    const { children } = props;
    const [checkType, setCheckType] = useState();
    const [quantity, setQuantity] = useState(1);
    const [imageShow, setImageShow] = useState(props.value.image);

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

    return (
        <>
            <div className={cx('wrapper')}>
                <PopperWrapper className={cx('popper-wrapper')}>
                    <div className="grid wide">
                        <div className="row">
                            <div className={`${cx('image')} col l-6`}>
                                <div className={cx('img-list')}>
                                    <img
                                        src={props.value.image}
                                        alt="book"
                                        onClick={() => setImageShow(props.value.image)}
                                    />
                                    <img
                                        src={props.value.back_image}
                                        alt="book"
                                        onClick={() => setImageShow(props.value.back_image)}
                                    />
                                </div>
                                <div className={cx('img-main')}>
                                    <img src={imageShow} alt="book" />
                                </div>
                            </div>
                            <div className={`${cx('content')} col l-6`}>
                                <h1 className={cx('name')}>{props.value.name}</h1>
                                <div className={cx('group', 'author-group')}>
                                    <span>Author: </span>
                                    <span className={cx('value')}>{props.value.author}</span>
                                </div>
                                <div className={cx('group', 'price-group')}>
                                    <h2 className={cx('price')}>${props.value.sale}</h2>
                                    <h2 className={cx('sale')}>${props.value.price}</h2>
                                </div>

                                <div className={cx('group')}>
                                    <span>Topic: </span>
                                    {props.value.topic.map((topic, index) => (
                                        <span key={index} className={cx('value')}>
                                            {index >= props.value.topic.length - 1
                                                ? topic.concat('')
                                                : topic.concat(', ')}
                                        </span>
                                    ))}
                                </div>
                                <div className={cx('group')}>
                                    <span>Type of book cover: </span>
                                    <div className={cx('action')}>
                                        {props.value.type.map((type, index) => (
                                            <label key={index}>
                                                <input
                                                    type="radio"
                                                    className={cx('input-checkbox')}
                                                    checked={checkType === index}
                                                    onChange={() => setCheckType(index)}
                                                />
                                                {type}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className={cx('group')}>
                                    <span>Quantity: </span>
                                    <div className={cx('quantity')}>
                                        <span className={cx('quantity_btn')} onClick={handleMinus}>
                                            <MinusIcon />
                                        </span>
                                        <span className={cx('quantity_input')}>{quantity}</span>
                                        <span className={cx('quantity_btn')} onClick={handlePlus}>
                                            <PlusIcon />
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('group', 'btn-group')}>
                                    <Button primary large>
                                        <span className={cx('btn-icon')}>
                                            <CartIcon />
                                        </span>
                                        Add to cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {children}
                </PopperWrapper>
            </div>
            <Modal className={cx('overlay_none')}></Modal>
        </>
    );
}

export default ProductModal;
