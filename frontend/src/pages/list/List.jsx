import { useContent } from "../../hooks/useContent"; 
import { useGetListQuery } from "../../api/apiSlice";
import ListView from '../../components/ListView';
import SEO from '../../components/SEO';
import './list.scss';

const List = () => {
    const result = useGetListQuery();
    const {renderContent} = useContent();
    const listView = renderContent(result, <ListView list={result.data} />);
    return (
        <div className="list">
            <SEO
                title='Список литературы'
                description='Оформите ссылки на источнки для своего списка литературы по ГОСТ.' />
            <h1 className="list__title">Список литературы</h1>
            {listView}
        </div>
    )
}

export default List;