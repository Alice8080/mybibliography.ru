const OrderDetails = ({order}) => {
    const status = (status) => {
        switch (status) {
            case 'succeeded':
                return <p>Заказ оплачен. Мы отправим его в указанный срок на вашу электронную почту.</p>;
            case 'canceled':
                return <p>Заказ отменен</p>;
            default:
                return <p>
                    Заказ не оплачен. Чтобы сделать заказ, 
                    заполните необходимую информацию на странице заказа и оплатите его. 
                    Если вы оплатили заказ, но его статус все еще «не оплачен», попробуйте подождать несколько минут
                    и обновить страницу. Если ошибка не исчезнет, напишите на нашу почту: <a href="mailto:info@mybibliography.ru">info@mybibliography.ru</a>.
                </p>;
        }
    }
    return (
        <section className="account__order-details">
            <h4>Заказ №{order.id}</h4>
            <h5>Тема работы</h5>
            <p>{order.theme}</p>
            <h5>Статус заказа</h5>
            {status(order.status)}
            {order.status === 'succeeded' ? (
                <><h5>Срок выполнения</h5>
                <p>{order.urgency ? 'Сутки' : 'Трое суток'} с момента оплаты</p></>
            ) : null}
            <h5>Время создания заказа</h5>
            <p>{order.created_at}</p>
            <h5>Стоимость</h5>
            <p>{order.price} &#8381;</p>
            <h5>Указанная при заказе электронная почта</h5>
            <p>{order.email}</p>
        </section> 
    )
}

export default OrderDetails;