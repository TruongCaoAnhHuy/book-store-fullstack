import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Button from '~/components/Button/Button';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Sidebar() {
    const productData = useSelector((state) => state.product.productList);
    console.log(productData);
    const authorArr = [];
    productData.map((product) => {
        authorArr.push(product.author);
    });
    // arrayAuthor
    const authors = authorArr.filter((item, index) => authorArr.indexOf(item) === index);

    // const topicArr = [];
    // productData.map((product) => {
    //     console.log(product.topic);
    //     topicArr.concat(product.topic);
    // });
    // // arrayTopic
    // // const topics = topicArr.filter((item, index) => topicArr.indexOf(item) === index);
    // console.log(topicArr);

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

    return (
        <div className={cx('wrapper', productData.length > 0 ? '' : 'hidden')}>
            <div className={cx('author-check')}>
                <h2 className={cx('title')}>Author</h2>
                <ul className={cx('check-list')}>
                    {authors.map((author, index) => (
                        <li className={cx('check-item')} key={index}>
                            <label className={cx('label')}>
                                <input type="checkbox" />
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
                                <input type="checkbox" />
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
