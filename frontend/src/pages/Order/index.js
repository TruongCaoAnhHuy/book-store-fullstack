import className from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './Oder.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Loading from '~/layouts/components/Loading/Loading';

const cx = className.bind(styles);

function Order() {
    const orderData = useSelector((state) => state.order.orderList);
    const userData = useSelector((state) => state.user.user);

    const orderUser = orderData.map((order, index) => {
        const user = userData.filter((item) => item._id === order.user);

        return user;
    });

    const ts = orderData.map((order) => {
        const date = new Date(order.createdAt);
        return date.toLocaleString();
    });

    return (
        <div className={cx('wrapper')}>
            <div className="row">
                <div className="col l-12">
                    <PopperWrapper>
                        <header className={cx('header')}>
                            <h2 className={cx('title')}>Orders List</h2>
                        </header>
                        <div className={cx('body')}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className={cx('table-col')}>#</th>
                                        <th className={cx('table-col')}>User Name</th>
                                        <th className={cx('table-col', 'hidden')}>User Email</th>
                                        <th className={cx('table-col', 'hidden')}>User Phone</th>
                                        <th className={cx('table-col', 'hidden')}>Created At</th>
                                        <th className={cx('table-col')}>Cart</th>
                                        <th className={cx('table-col')}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderData.length > 0 ? (
                                        orderData.map((data, index) => (
                                            <tr key={index}>
                                                <th className={cx('table-col')}>{index + 1}</th>
                                                <td className={cx('table-col')}>{orderUser[index][0].name}</td>
                                                <td className={cx('table-col', 'hidden')}>
                                                    {orderUser[index][0].email}
                                                </td>
                                                <td className={cx('table-col', 'hidden')}>
                                                    {orderUser[index][0].phone}
                                                </td>
                                                <td className={cx('table-col', 'hidden')}>{ts[index]}</td>
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
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={7}>
                                                <Loading />
                                            </td>
                                        </tr>
                                    )}
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
