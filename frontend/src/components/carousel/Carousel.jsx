import Carousel from 'react-bootstrap/Carousel';
import carouselItems from './carouselItems'; 
import ModalButton from '../modal/Modal';
import './carousel.scss';

const OrderCarousel = () => {
  return (
    <Carousel>
        {carouselItems.map((item) => {
            return (
                <Carousel.Item key={item.id}>
                    <Carousel.Caption>
                        <ModalButton settings={item.modalSettings} />
                        <h3 className="carousel__title">{item.type}</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            )
        })}
    </Carousel>
  );
};
export default OrderCarousel;