import clock from '../../assets/images/clock-img.png';
import fire from '../../assets/images/fire-img.png';
import sheild from '../../assets/images/sheild-img.png';
import './hero-section.scss';

const HeroSection = () => {
    return (
        <section className="order__hero-section hero-section">
            <h1 className="hero-section__header">Почему стоит заказать список литературы у нас:</h1>
            <div className="hero-section__blocks">
                <div className="hero-section__block">
                    <img className="hero-section__image" src={clock} />
                        <div className="hero-section__text">
                        <h2 className="hero-section__title">Скорость выполнения</h2>
                        <h2 className="hero-section__subtitle">Специалист-библиограф с высшим образованием оформит ваш список литературы за 1-3 дня</h2>
                    </div>
                </div>
                <div className="hero-section__block">
                    <img className="hero-section__image" src={fire} />
                    <div className="hero-section__text">
                        <h2 className="hero-section__title">Высокое качество работы</h2>
                        <h2 className="hero-section__subtitle">Вы можете убедиться сами, посмотрев примеры выполненных списков литературы</h2>
                    </div>
                </div>
                <div className="hero-section__block">
                    <img className="hero-section__image" src={sheild} />
                    <div className="hero-section__text">
                        <h2 className="hero-section__title">Грамотное оформление</h2>
                        <h2 className="hero-section__subtitle">При оформлении списка литературы мы используем актуальный ГОСТ</h2>
                    </div>
                </div>
            </div>
        </section>
    )
};
export default HeroSection;