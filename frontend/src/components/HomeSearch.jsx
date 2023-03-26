import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import SearchForm from './searchForm/SearchForm';
import { querySent } from './searchForm/searchSlice';

const HomeSearch = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(querySent(''));
    }, []);

    const onSearchClick = () => {
        navigate('/search/');
    }

    return (
        <div className="home__main">
            <section className="home__text">
                <h1 className="home__title">Список литературы по ГОСТ онлайн</h1>
                <h2 className="home__subtitle">Оформите список литературы для курсовой, диплома, доклада за несколько минут. 
                <br />
                Большая база оформленных ссылок на источники для вашей работы.
                </h2>
            </section>
            <section className="home__search">
                <SearchForm onSearchClick={onSearchClick} />
            </section>
        </div>
    );
};
export default HomeSearch;