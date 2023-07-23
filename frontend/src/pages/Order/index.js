import className from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './Oder.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button/Button';

const cx = className.bind(styles);

function Order() {
    const orderData = useSelector((state) => state.order.orderList);
    const userData = useSelector((state) => state.user.user);
    console.log(orderData);

    const orderUser = orderData.map((order, index) => {
        const user = userData.filter((item) => item._id === order.user);

        return user;
    });

    console.log(orderUser);

    return (
        <div className={cx('wrapper')}>
            <div className="row">
                <div className="col l-12">
                    <PopperWrapper>
                        <header className={cx('header')}>
                            <h2 className={cx('title')}>Orders List</h2>
                            <Button to={'/admin/users/create'} primary className={cx('btn-add')}>
                                Add new user
                            </Button>
                        </header>
                        <div className={cx('body')}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className={cx('table-col')}>#</th>
                                        <th className={cx('table-col')}>User Name</th>
                                        <th className={cx('table-col')}>User Email</th>
                                        <th className={cx('table-col')}>User Phone</th>
                                        <th className={cx('table-col')}>Cart</th>
                                        <th className={cx('table-col')}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderData.map((data, index) => (
                                        <tr key={index}>
                                            <th className={cx('table-col')}>{index + 1}</th>
                                            <td className={cx('table-col')}>{orderUser[index][0].name}</td>
                                            <td className={cx('table-col')}>{orderUser[index][0].email}</td>
                                            <td className={cx('table-col')}>{orderUser[index][0].phone}</td>
                                            <td className={cx('table-col')}>
                                                {data.orderItems.map((item, index) => (
                                                    <div key={index} className={cx('image-item')}>
                                                        <img src={item.image} alt="book" /> ${item.price} x{' '}
                                                        {item.quantity}
                                                    </div>
                                                ))}
                                            </td>
                                            <td className={cx('table-col')}>${data.totalPrice}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </PopperWrapper>
                </div>
            </div>
        </div>
    );
}
export default Order;
