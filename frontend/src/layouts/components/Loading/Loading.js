import classNames from 'classnames/bind';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Loading({ className }) {
    const classes = cx('wrapper', {
        [className]: className,
    });

    return (
        <div className={classes}>
            <FontAwesomeIcon className={cx('icon-loading')} icon={faSpinner} />
        </div>
    );
}

export default Loading;
