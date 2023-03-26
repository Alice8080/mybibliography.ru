import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Icon } from '@iconify/react';
import { useLazyGetSearchResultsQuery } from '../api/apiSlice';
import SearchForm from './searchForm/SearchForm';
import SearchResult from './searchResult/SearchResult';
import ModalButton from './modal/Modal';
import Error from './error/Error';
import SmallSpinner from './spinner/SmallSpinner';

const SearchView = () => {
    const [getSearchResults,
    {   data: result,
        isLoading,
        isFetching,
        isSuccess,
        isError
    }] = useLazyGetSearchResultsQuery();
    const {query} = useSelector(state => state.search);
    const [list, setList] = useState([]);
    const [listEnded, setListEnded] = useState(false);

    useEffect(() => {
        if (query !== '') {
            onSearch(query, 0);
        } // eslint-disable-next-line
    }, []);

    const onSearchClick = (query) => {
        setList([]);
        onSearch(query, 0);
    }

    const onSearch = (query, offset) => {
        getSearchResults({query, offset});
    }

    useEffect(() => {
        if (list !== undefined && result !== undefined) {
            result.length < 5 ? setListEnded(true) : setListEnded(false);
            setList(list => [...list, ...result]);
        } // eslint-disable-next-line
    }, [result]);

    const renderContent = useMemo(() => {
        if (list !== undefined) {
            return (
                <>
                    <SearchResult result={list} />
                    <button 
                        className="search-result__button-add"
                        disabled={isLoading || isFetching} 
                        style={{ 'display': listEnded ? 'none' : 'block' }}
                        onClick={() => {
                            const offset = list.length;
                            onSearch(query, offset);
                        }}>
                        Загрузить ещё
                        <Icon icon="system-uicons:refresh-alt" />
                    </button>
                </>)
        } // eslint-disable-next-line
   }, [list]);

    const modalSettings = {
        buttonSettings: {
            buttonClassName: 'search__info-button',
            text: 'Как работает поиск',
            icon: ''
        },
        contentSettings: {
            title: 'Как это работает?', 
            content: function Content() {
                return (
                <>
                <p>
                    Находите источники для своего списка всего за несколько секунд!
                </p>
                <p>
                    Вы можете найти нужные источники по ключевым словам, фамилиям авторов, ISBN книг, названиям сайтов или ссылкам на них.
                </p>
                <p>
                    Поиск проводится по названиям книг, журналов, статей, сайтов и других ресурсов; фамилиям
                    авторов и редакторов; ссылкам; номерам патентов и ГОСТов; специальностям диссертаций и
                    авторефератов диссертаций; ISBN книг. 
                
                    В базе данных представлены более 200 000 источников на русском, английском и других
                    языках из различных областей технических, гуманитарных, естественных наук.
                </p>
                </>
                )
            },
            buttons: []
        }
    };    
    return (
        <>
            <section className="search__main">
                <section className="search__header">
                    <h1 className="search__title"><span>Более 200 000 источников</span> для вашего списка литературы</h1>
                    <h2 className="search__subtitle">
                        Оформленные по ГОСТ 7.0.100–2018 ссылки на книги, журналы, статьи, сайты и
                        другие ресурсы
                    </h2>
                </section>
                <SearchForm onSearchClick={onSearchClick} />
                <div className="search__info">
                    <ModalButton settings={modalSettings} />
                    <Link className="search__info-button" to='/tip-dokumenta'>Оформить ссылку на источник</Link>
                </div>
                <Link className="search__info-order" to='/zakazat-spisok-literatury'>Не нашли достаточно источников? <br /> Мы сделаем список для вас</Link>
            </section>
            {isSuccess ? renderContent :
            isError ? <Error /> :
            null}
            {isLoading || isFetching ? <SmallSpinner /> : null}
        </>
    )
}
export default SearchView;