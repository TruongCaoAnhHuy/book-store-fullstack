import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { useSelector } from 'react-redux';
import { useLayoutEffect, useState } from 'react';

import styles from './Book.module.scss';
import Button from '~/components/Button/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { toast } from 'react-hot-toast';
import Loading from '~/layouts/components/Loading/Loading';

const cx = classNames.bind(styles);

function Book() {
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const productData = useSelector((state) => state.product.productList);
    const api = process.env.REACT_APP_SERVER_DOMIN;

    const handleClickDelete = async (id) => {
        const answer = window.confirm('Do you wanna delete product ?');
        if (answer) {
            let fetchData = await fetch(`${api}/admin/books/delete/${id}`, {
                method: 'DELETE',
            });

            const dataRes = await fetchData.json();
            if (dataRes) {
                toast(dataRes.message);
                window.location.reload();
            }
        } else {
            return;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className="row">
                <div className="col l-12">
                    <PopperWrapper>
                        <header className={cx('header')}>
                            <h2 className={cx('title')}>Book List</h2>
                            <Button to={'/admin/books/create'} primary className={cx('btn-add')}>
                                Add new book
                            </Button>
                        </header>
                        <div className={cx('body')}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className={cx('table-col')}>#</th>
                                        <th className={cx('table-col')}>Book Image</th>
                                        <th className={cx('table-col')}>Book Name</th>
                                        <th className={cx('table-col')}>Book Author</th>
                                        <th className={cx('table-col')}>Book Price</th>
                                        <th className={cx('table-col')}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productData.length > 0 ? (
                                        productData.map((product, index) => (
                                            <tr key={product._id}>
                                                <th className={cx('table-col')}>{index + 1}</th>
                                                <td className={cx('table-col')}>
                                                    <img src={product.image} alt="book" />
                                                </td>
                                                <td className={cx('table-col')}>{product.name}</td>
                                                <td className={cx('table-col')}>{product.author}</td>
                                                <td className={cx('table-col')}>{product.price}</td>
                                                <td className={cx('table-col')}>
                                                    <Tippy content="Edit" placement="bottom">
                                                        <Link
                                                            to={`/admin/books/edit/${product._id}`}
                                                            className={cx('action-btn')}
                                                        >
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </Link>
                                                    </Tippy>
                                                    <Tippy content="Delete" placement="bottom">
                                                        <button
                                                            to={''}
                                                            className={cx('action-btn')}
                                                            onClick={() => handleClickDelete(product._id)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </Tippy>
                                                </td>
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

export default Book;
