import HeroSection from '../../components/heroSection/HeroSection';
import Carousel from '../../components/carousel/Carousel';
import OrderForm from '../../components/OrderForm';
import SEO from '../../components/SEO';
import './order.scss';

const Order = () => {
    return (
        <div className="order">
            <SEO
                title='Заказать список литературы'
                description='Закажите подбор источников и оформление списка литературы у профессионалов.' />
            <HeroSection />
            <div className="order__arrow">
                <span className="iconify" data-icon="system-uicons:arrow-down"></span>
            </div>
            <Carousel />
            <OrderForm />
        </div>
    )
};
export default Order;