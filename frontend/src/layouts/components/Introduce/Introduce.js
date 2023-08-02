import classNames from 'classnames/bind';
import { Typewriter } from 'react-simple-typewriter';

import images from '~/assets/img';
import Button from '~/components/Button/Button';
import styles from './Introduce.module.scss';

const cx = classNames.bind(styles);

function Introduce() {
    return (
        <div className={cx('wrapper')}>
            <div className={`${cx('container')} row`}>
                <div className={`${cx('image')} col l-6 m-6 c-12`}>
                    <img src={images.book} alt="book" />
                </div>
                <div className={`${cx('title')} col l-6 m-6 c-12`}>
                    <h1 className={cx('intro')}>Knowledge is</h1>
                    <h1 className={cx('intro', 'active')}>
                        <Typewriter
                            words={['Strength.', 'Endless.']}
                            loop={Infinity}
                            cursor
                            cursorStyle="|"
                            typeSpeed={150}
                            deleteSpeed={100}
                            delaySpeed={1500}
                        />
                    </h1>
                    <p className={cx('desc')}>
                        There are many variations of passages of Lorem Ipsum
                        <br />
                        the majority have suffered alteration in some.
                    </p>
                    <Button to={'/catalog'} className={cx('more-btn')} outline large>
                        Explore More{' '}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Introduce;
