import SEO from '../../components/SEO';
import Hero from '../../components/hero/Hero';
import Links from '../../components/links/Links';
import Studies from '../../components/studies/Studies';
import './home.scss';

const Home = () => {
    return (
        <div className="home">
            <SEO
                title='Список литературы по ГОСТ онлайн'
                description='Как оформить список литературы по ГОСТ в реферате, курсовой, дипломной работе: простой способ. Большая база оформленных источников' />
            <div className="home__main">
                <Hero />
                <Links />
            </div>
            <div className="home__studies">
                <Studies />
            </div>
        </div>
    );
}

export default Home;