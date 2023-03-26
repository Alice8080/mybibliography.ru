import { useContent } from "../../hooks/useContent"; 
import { useGetUserInfoQuery } from "../../api/apiSlice";
import AccountLists from '../../components/AccountLists';
import AccountRequests from '../../components/AccountRequests';
import AccountOrders from '../../components/AccountOrders';
import SEO from '../../components/SEO';
import './account.scss';

const Account = () => {
    const response = useGetUserInfoQuery();
    const {renderContent} = useContent();
    const renderInfo = renderContent(response, (
        <div className="account__content">
            <div className="account__data">
                <AccountLists data={response.data} />
                <AccountRequests data={response.data} />
            </div>
            <AccountOrders data={response.data} />
        </div>
    ));

    return (
        <div className="account">
            <SEO
                title='Личный кабинет'
                description='Списки литературы и последние поисковые запросы.' />
            <h1 className="account__title">Личный кабинет</h1>
            <h2 className="account__subtitle">
                Ваши списки литературы,  последние поисковые запросы и заказы. Нажмите на них, чтобы вернуться к нужной информации в любое время.           
            </h2>
            {renderInfo}
        </div>
    )
}

export default Account;