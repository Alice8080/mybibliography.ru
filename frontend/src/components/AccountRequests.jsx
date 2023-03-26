import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { querySent } from './searchForm/searchSlice';

const AccountRequets = ({data}) => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const handleClick = (request) => {
        dispatch(querySent(request));
        navigate('/search/');
    }; 
    return (
        <section className="account__requests">
            <h3>Поисковые запросы</h3>
            <h4>Последние 50 поисковых запросов</h4>
            {data.requests.length === 0 ? <h4>Поисковых запросов пока нет</h4> :
                data.requests.map((request, i) => {
                return (
                    <button key={i} className="account__button" onClick={() => handleClick(request)}>
                        {request}
                    </button>
                )
            })}
        </section>
    )
}

export default AccountRequets;