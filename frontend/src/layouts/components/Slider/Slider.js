import { useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import classNames from 'classnames/bind';

import ProductItem from '../ProductItem/ProductItem';
import Loading from '../Loading/Loading';
import style from './Slider.module.scss';

const cx = classNames.bind(style);

function Slider() {
    const productData = useSelector((state) => state.product.productSliderList);
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 1024 },
            items: 4,
        },
        desktop: {
            breakpoint: { max: 1024, min: 800 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 800, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <div className="grid wide">
            {productData.length > 0 ? (
                <div className={cx('wrapper')}>
                    <Carousel
                        swipeable={false}
                        draggable={false}
                        responsive={responsive}
                        autoPlaySpeed={1500}
                        infinite={true}
                        autoPlay
                        centerMode
                        containerClass="carousel-container"
                    >
                        {productData.map((product, index) => (
                            <ProductItem
                                className={'col l-4'}
                                key={index}
                                id={product._id}
                                name={product.name}
                                author={product.author}
                                image={product.image}
                                back_image={product.back_image}
                                price={product.price}
                                sale={product.sale}
                                topic={product.topic}
                                type={product.type}
                                description={product.description}
                                to={`/books/${product._id}`}
                            />
                        ))}
                    </Carousel>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default Slider;
