import './bootstrap.css';
import './grid.css';
import './GlobalStyles.scss';

function GlobalStyles({ children }) {
    return <div className="wrapper">{children}</div>;
}

export default GlobalStyles;
