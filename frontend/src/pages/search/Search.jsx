import SearchView from '../../components/SearchView';
import SEO from '../../components/SEO';
import './search.scss';

const Search = () => {
    return (
        <div className="search">
            <SEO
                title='Поиск'
                description='Найдите источники для своего списка литературы. Большая база оформленных ссылок.' />
            <SearchView />
        </div>
    );
};
export default Search;