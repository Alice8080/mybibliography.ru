import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import SearchForm from '../searchForm/SearchForm';
import { querySent } from '../searchForm/searchSlice';
import { ReactComponent as HeroImg } from '../../assets/images/hero-img.svg';
import { ReactComponent as DarkHeroImg } from '../../assets/images/dark-hero-img.svg';
import './hero.scss';

const Hero = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.theme);
    useEffect(() => {
        dispatch(querySent(''));
    }, []);

    const onSearchClick = () => {
        navigate('/search/');
    };
    
    return (
        <section className="hero">
            <div className="hero__text">
                <h1>Список литературы по ГОСТ онлайн</h1>
                <h2>Оформите список литературы для курсовой, диплома, доклада за несколько минут. Большая база оформленных ссылок на источники.</h2>
                <SearchForm onSearchClick={onSearchClick} />
            </div>
            <div className="hero__img">
                {theme === 'light' ? <HeroImg /> : <DarkHeroImg />}
            </div>
        </section>
    )
};
export default Hero;