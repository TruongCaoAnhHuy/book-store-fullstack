import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { useSelector } from 'react-redux';
import { useLayoutEffect } from 'react';

import Button from '~/components/Button/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { toast } from 'react-hot-toast';
import Loading from '~/layouts/components/Loading/Loading';
import styles from './Book.module.scss';

const cx = classNames.bind(styles);

function Book() {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const productSliderData = useSelector((state) => state.product.productSliderList);
    const productFeatureData = useSelector((state) => state.product.productFeatureList);
    const productSiteData = useSelector((state) => state.product.productList);

    const productDataSet = [...productSliderData, ...productFeatureData, ...productSiteData];

    const result = productDataSet.filter((item, index, self) => index === self.findIndex((t) => t._id === item._id));

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
                                        <th className={cx('table-col', 'tb-name', 'hidden')}>Book Name</th>
                                        <th className={cx('table-col', 'hidden')}>Book Author</th>
                                        <th className={cx('table-col', 'hidden')}>Book Price</th>
                                        <th className={cx('table-col')}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.length > 5 ? (
                                        result.map((product, index) => (
                                            <tr key={product._id}>
                                                <th className={cx('table-col')}>{index + 1}</th>
                                                <td className={cx('table-col')}>
                                                    <img src={product.image} alt="book" />
                                                </td>
                                                <td className={cx('table-col', 'hidden')}>{product.name}</td>
                                                <td className={cx('table-col', 'hidden')}>{product.author}</td>
                                                <td className={cx('table-col', 'hidden')}>{product.price}</td>
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
