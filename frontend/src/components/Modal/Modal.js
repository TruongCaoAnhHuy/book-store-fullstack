import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ children, className }) {
    const classes = cx('overlay', {
        [className]: className,
    });
    return <div className={classes}>{children}</div>;
}

export default Modal;
