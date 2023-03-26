import SEO from '../../components/SEO';
import HomeSearch from '../../components/HomeSearch';
import HomeLinks from '../../components/HomeLinks';
import './home.scss';

const Home = () => {    
    return (
    <div className="home">
        <SEO
            title='Список литературы по ГОСТ онлайн'
            description='Как оформить список литературы по ГОСТ в реферате, курсовой, дипломной работе: простой способ. Большая база оформленных источников' />
        <HomeSearch />
        <hr className="home__line line line-xl" />
        <HomeLinks />
    </div>
    );
}

export default Home;