import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLazyGetOrderQuery } from '../api/apiSlice';
import { useContent } from "../hooks/useContent"; 
import OrderDetails from './OrderDetails';
import ModalButton from './modal/Modal';

const AccountOrders = ({data}) => {
    const [activeOrder, setActiveOrder] = useState();
    const [getOrder, response] = useLazyGetOrderQuery();
    const {renderContent} = useContent();
    const renderOrder = renderContent(response, <OrderDetails order={response.data} />);

    const handleClick = (order) => {
        setActiveOrder(order);
        getOrder(order);
    }

    const modalSettings = {
        buttonSettings: {
            buttonClassName: 'account__orders-button',
            text: 'Подробнее про заказы',
            icon: ''
        },
        contentSettings: {
            title: 'Подробнее про заказы', 
            content: function Content() {
                return (
                <>
                    <p>
                        Нажмите на тему заказа, чтобы посмотреть подробную информацию о нем. 
                    </p>       
                    <br />             
                    <h4>Оформление заказов</h4>
                    <p>
                        Если вам нужно подобрать подходящие источники по вашей теме или оформить по ГОСТ уже готовый список, мы готовы помочь. 
                        Оформить заказ можно на странице <Link to="/zakazat-spisok-literatury">Заказать список литературы</Link>. 
                        Укажите тему вашей работы, необходимое количество источников и электронную почту, на которую отправить готовый список литературы. 
                        Также вы можете указать дополнительные параметры: информацию о работе, ключевые слова, предметную область, чтобы подбор источников был более точным. 
                    </p>
                    <p>
                        Если у вас есть список, который необходимо оформить по ГОСТ и/или дополнить, вставьте его в соответствующее поле. 
                        В поле “необходимое количество источников” укажите число источников, которое должно быть в итоговом списке. 
                        Если дополнять список не надо, то укажите количество источников в нем. 
                    </p>
                    <br />
                    <h4>Сроки выполнения</h4>
                    <p>
                        Если список литературы нужен срочно, поставьте галочку в пункте «Список литературы нужен в течение суток», 
                        тогда работа будет отправлена на вашу почту в течение суток с момента оплаты. 
                        В ином случае мы отправим вам готовый список в течение трех суток после оплаты.
                    </p>
                    <p>
                        Обращаем ваше внимание, что в течение суток может быть выполнен только список меньше, чем из 50 источников. 
                    </p>
                    <br />
                    <h4>Отмена заказов и другие вопросы</h4>
                    <p>
                        Отменить заказ можно только в течение первых 12 часов после оплаты. 
                        Если у вас есть вопрос по заказу или вы хотите его отменить, напишите на нашу электронную почту <a href="mailto:info@mybibliography.ru">info@mybibliography.ru</a>, указав тему заказа и электронную почту, которую вы указывали при оформлении заказа. 
                    </p>
                </>)
            },
            buttons: []
        }
    };

    return (
        <section className="account__orders">
            <div className="account__orders-title">
                <h3>Заказы</h3>
                <ModalButton settings={modalSettings} />
            </div>
            
            {data.orders.length === 0 ? <h4>У вас пока нет заказов на списки литературы</h4> :
                <>
                    <h4>Нажмите на тему заказа, чтобы посмотреть подробную информацию</h4>
                    {
                        data.orders.map(({theme, order}) => {
                            return (
                                <div key={order}>
                                    <button className="account__button" onClick={() => handleClick(order)}>
                                        {theme}
                                    </button>
                                    {activeOrder === order ? renderOrder : null}
                                </div>
                            )
                        })
                    }
                </>
            }
        </section>
    )
}

export default AccountOrders;