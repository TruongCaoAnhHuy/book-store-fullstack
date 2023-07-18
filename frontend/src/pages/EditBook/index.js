import classNames from 'classnames/bind';
import { useEffect, useState, useLayoutEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './EditBook.module.scss';
import Button from '~/components/Button/Button';
import { ImagetoBase64 } from '~/ulti/ImagetoBase64';

const cx = classNames.bind(styles);

function EditBook() {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const topics = [
        {
            id: 0,
            name: 'Detective',
        },
        {
            id: 1,
            name: 'Anime',
        },
        {
            id: 2,
            name: 'Romantic',
        },
        {
            id: 3,
            name: 'Self-control',
        },
        {
            id: 4,
            name: 'Novel',
        },
        {
            id: 5,
            name: 'Fantasy',
        },
        {
            id: 6,
            name: 'Adventure',
        },
        {
            id: 7,
            name: 'Fiction',
        },
    ];

    const types = [
        {
            id: 0,
            name: 'Hardcover',
        },
        {
            id: 1,
            name: 'Paperback',
        },
    ];

    const displays = [
        {
            id: 0,
            name: 'Slider',
        },
        {
            id: 1,
            name: 'Feature',
        },
    ];

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
        display: [],
    });

    const navigative = useNavigate();
    let params = useParams();

    const handleUploadFontBook = async (e) => {
        const data = await ImagetoBase64(e.target.files[0]);

        setValues((prev) => {
            return {
                ...prev,
                image: data,
            };
        });
    };

    const handleUploadBackBook = async (e) => {
        const data = await ImagetoBase64(e.target.files[0]);

        setValues((prev) => {
            return {
                ...prev,
                back_image: data,
            };
        });
    };

    const handleSetTopicChecked = (name) => {
        setValues((prev) => {
            const isChecked = values.topic.includes(name);
            if (isChecked) {
                return { ...prev, topic: [...values.topic.filter((item) => item !== name)] };
            } else {
                return { ...prev, topic: [...values.topic, name] };
            }
        });
    };

    const handleSetTypeChecked = (name) => {
        setValues((prev) => {
            const isChecked = values.type.includes(name);
            if (isChecked) {
                return { ...prev, type: [...values.type.filter((item) => item !== name)] };
            } else {
                return { ...prev, type: [...values.type, name] };
            }
        });
    };

    const handleSetDisplayChecked = (name) => {
        setValues((prev) => {
            const isChecked = values.display.includes(name);
            if (isChecked) {
                return { ...prev, display: [...values.display.filter((item) => item !== name)] };
            } else {
                return { ...prev, display: [...values.display, name] };
            }
        });
    };

    const api = process.env.REACT_APP_SERVER_DOMIN;

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        const { name, author, price, description, image, back_image, topic, type } = values;

        if (name && author && price && description && image && back_image && topic && type) {
            const fetchData = await fetch(`${api}/admin/books/update/${id}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await fetchData.json();
            toast(data.message);
            navigative('/admin/books');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            toast('Fill all fields !!!');
        }
    };

    const handleClickEdit = async (id) => {
        let fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/admin/books/edit/${id}`, {
            method: 'POST',
        });

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
            display: dataRes.display,
        });
    };

    useEffect(() => {
        handleClickEdit(params.id);
    }, [params.id]);

    return (
        <div className={cx('wrapper')}>
            <PopperWrapper>
                <header className={cx('header')}>
                    <h2 className={cx('title')}>Book Edit</h2>
                </header>
                <div className={cx('body')}>
                    <form onSubmit={(e) => handleSubmit(e, params.id)}>
                        <div className={cx('form-group')}>
                            <label htmlFor="name">Book Name:</label>
                            <input
                                id="name"
                                name="name"
                                placeholder="Book Name..."
                                value={values.name}
                                onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="author">Book Author:</label>
                            <input
                                id="author"
                                name="author"
                                placeholder="Book Author..."
                                value={values.author}
                                onChange={(e) => setValues((prev) => ({ ...prev, author: e.target.value }))}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="price">Book Price ($):</label>
                            <input
                                className={cx('price-input')}
                                id="price"
                                name="price"
                                type="number"
                                min="10"
                                step="5"
                                value={values.price}
                                onChange={(e) => setValues((prev) => ({ ...prev, price: Number(e.target.value) }))}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="sale">Book Sale ($):</label>
                            <input
                                className={cx('price-input')}
                                id="sale"
                                name="sale"
                                type="number"
                                min="0"
                                step="1"
                                value={values.sale}
                                onChange={(e) => setValues((prev) => ({ ...prev, sale: Number(e.target.value) }))}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="desc">Book Description:</label>
                            <textarea
                                id="desc"
                                name="description"
                                className={cx('desc-input')}
                                value={values.description}
                                onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label>Book Cover:</label>
                            <div className="d-flex">
                                <div className={cx('custom-from')}>
                                    {values.image ? (
                                        <img src={values.image} alt="book" />
                                    ) : (
                                        <>
                                            <label className={cx('custom-label')}>Front of book</label>
                                            <span>
                                                <FontAwesomeIcon icon={faUpload} />
                                            </span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        className={cx('input-hidden')}
                                        accept="image/*"
                                        onChange={(e) => handleUploadFontBook(e)}
                                    />
                                </div>
                                <div className={cx('custom-from')}>
                                    {values.back_image ? (
                                        <img src={values.back_image} alt="book" />
                                    ) : (
                                        <>
                                            <label className={cx('custom-label')}>Back of book</label>
                                            <span>
                                                <FontAwesomeIcon icon={faUpload} />
                                            </span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        className={cx('input-hidden')}
                                        accept="image/*"
                                        onChange={(e) => handleUploadBackBook(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="topic">Topic:</label>
                            <div className={cx('action')}>
                                {topics.map((topic) => (
                                    <label key={topic.id}>
                                        <input
                                            type="checkbox"
                                            className={cx('input-checkbox')}
                                            checked={values.topic.includes(topic.name)}
                                            onChange={() => handleSetTopicChecked(topic.name)}
                                        />
                                        {topic.name}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="type">Types of book cover:</label>
                            <div className={cx('action')}>
                                {types.map((type) => (
                                    <label key={type.id}>
                                        <input
                                            type="checkbox"
                                            className={cx('input-checkbox')}
                                            checked={values.type.includes(type.name)}
                                            onChange={() => handleSetTypeChecked(type.name)}
                                        />
                                        {type.name}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={cx('form-group')}>
                            <label htmlFor="type">Displays:</label>
                            <div className={cx('action')}>
                                {displays.map((display) => (
                                    <label key={display.id}>
                                        <input
                                            type="checkbox"
                                            className={cx('input-checkbox')}
                                            checked={values.display.includes(display.name)}
                                            onChange={() => handleSetDisplayChecked(display.name)}
                                        />
                                        {display.name}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={cx('form-group', 'btn-group')}>
                            <Button primary className={cx('btn-action')}>
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </PopperWrapper>
        </div>
    );
}

export default EditBook;
