import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import styles from './Sidebar.module.scss';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Sidebar(props) {
    const productData = useSelector((state) => state.product.productList);
    const authorArr = [];
    productData.map((product) => {
        return authorArr.push(product.author);
    });
    // arrayAuthor
    const authors = authorArr.filter((item, index) => authorArr.indexOf(item) === index);

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
        {
            id: 8,
            name: 'Magic',
        },
    ];

    const [checkAuthor, setCheckAuthor] = useState([]);
    const handleCheckedAuthor = (author) => {
        setCheckAuthor((prev) => {
            const isChecked = checkAuthor.includes(author);
            if (isChecked) {
                return checkAuthor.filter((item) => item !== author);
            } else {
                return [...prev, author];
            }
        });
    };

    const [checkedTopic, setCheckedTopic] = useState([]);
    const handleCheckedTopic = (topic) => {
        setCheckedTopic((prev) => {
            const isChecked = checkedTopic.includes(topic);
            if (isChecked) {
                return checkedTopic.filter((item) => item !== topic);
            } else {
                return [...prev, topic];
            }
        });
    };

    useEffect(() => {
        props.ConsoleParent(checkAuthor, checkedTopic);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkAuthor, checkedTopic]);

    return (
        <div className={cx('wrapper', productData.length > 0 ? '' : 'hidden')}>
            <div className={cx('author-check')}>
                <h2 className={cx('title')}>Author</h2>
                <ul className={cx('check-list')}>
                    {authors.map((author, index) => (
                        <li className={cx('check-item')} key={index}>
                            <label className={cx('label')}>
                                <input
                                    type="checkbox"
                                    checked={checkAuthor.includes(author)}
                                    onChange={() => handleCheckedAuthor(author)}
                                />
                                {author}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={cx('author-check')}>
                <h2 className={cx('title')}>Topic</h2>
                <ul className={cx('check-list')}>
                    {topics.map((topic, index) => (
                        <li className={cx('check-item')} key={index}>
                            <label className={cx('label')}>
                                <input
                                    type="checkbox"
                                    checked={checkedTopic.includes(topic.name)}
                                    onChange={() => handleCheckedTopic(topic.name)}
                                />
                                {topic.name}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={cx('author-check')}>
                <h2 className={cx('title')}>Book Cover</h2>
                <ul className={cx('check-list')}>
                    <li className={cx('check-item')}>
                        <label className={cx('label')}>
                            <input type="checkbox" />
                            Hardcover
                        </label>
                    </li>
                    <li className={cx('check-item')}>
                        <label className={cx('label')}>
                            <input type="checkbox" />
                            Paperback
                        </label>
                    </li>
                </ul>
            </div>
            <Button primary>Clear checked</Button>
        </div>
    );
}

export default Sidebar;
