import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { usePostOrderMutation } from '../api/apiSlice';
import SmallSpinner from './spinner/SmallSpinner';
import yookassa from '../assets/images/yookassa.png';
import ModalButton from './modal/Modal';
import oferta from '../assets/documents/publichnaya-oferta.pdf';

const OrderForm = () => {
    const [postOrder, {data: confirmationUrl,
        error,
        isLoading,
        isSuccess,
        isError,
    }] = usePostOrderMutation();    

    const handleResponse = () => {
        window.location.href = confirmationUrl;
    }

    const calcPrice = (values) => {
        let price = +values.amount * 25;
        if (values.urgency) {
            price = price + 200;
        }
        switch (values.age) {
            case 'one':
                price = price + 100;
                break;
            case 'five':
                price = price + 50;
                break;
            case 'ten':
                price = price + 40;
                break;
            case 'fifteen':
                price = price + 30;
                break;
            case 'no_matter':
                price = price;
                break;
            default:
                break;
            }
        return price;
    };

    const modalSettings = {
        buttonSettings: {
            buttonClassName: 'order__button-info',
            text: 'Информация о стоимости, сроках и оформлении заказа',
            icon: 'system-uicons:info-circle'
        },
        contentSettings: {
            title: 'Информация о стоимости, сроках и оформлении заказа', 
            content: function Content() {
                return (
                    <>
                        <h4>Оформление заказа</h4>
                        <p>
                            Если вам нужно подобрать подходящие источники по вашей теме или оформить по ГОСТ уже готовый список, мы готовы вам помочь. 
                            Оформить заказ можно на этой странице. 
                            Укажите тему вашей работы, необходимое количество источников и электронную почту, на которую отправить готовый список литературы. 
                            Также вы можете указать дополнительные параметры: информацию о работе, ключевые слова, предметную область, чтобы подбор источников был более точным. 
                        </p>
                        <p>
                            Если у вас есть список, который необходимо оформить по ГОСТ и/или дополнить, вставьте его в соответствующее поле. 
                            В поле “необходимое количество источников” укажите число источников, которое должно быть в итоговом списке. 
                            Если дополнять список не надо, то укажите количество источников в нем. 
                        </p>
                        <p>
                            Мы оформляем все списки по актуальному ГОСТ Р 7.0.100–2018 «Библиографическая запись. Библиографическое описание. Общие требования и правила составления». 
                            Также мы можем оформить ваш список по другому стандарту: в поле «Информация о работе» вы можете указать, по какому именно документу или образу вам необходимо оформить список. 
                        </p>
                        <br />
                        <h4>Сроки выполнения</h4>
                        <p>
                            Если список литературы нужен срочно, поставьте галочку в пункте «Список литературы нужен в течение суток», 
                            тогда работа будет отправлена на вашу почту в течение суток с момента оплаты. 
                            В ином случае мы отправим вам готовый список в течение трех суток после оплаты.
                        </p>
                        <p>
                            Обращаем ваше внимание, что в течение суток может быть выполнен только список меньше, чем из 40 источников. 
                        </p>
                        <br />
                        <h4>Стоимость списка литературы</h4>
                        <ul className="modal__list">
                            <li>1 источник <br /> <span>25 ₽</span></li>
                            <li>Срочное выполнение в течение суток <br /> <span>+200 ₽</span></li>
                            <li>Источники не старше года <br /> <span>+100 ₽</span></li>
                            <li>Источники не старше 5 лет <br /> <span>+50 ₽</span></li>
                            <li>Источники не старше 10 лет <br /> <span>+40 ₽</span></li>
                            <li>Источники не старше 15 лет <br /> <span>+30 ₽</span></li>
                        </ul>
                        <br />
                        <h4>Где можно посмотреть информацию о созданных заказах</h4>
                        <p> 
                            Все созданные заказы отображаются в разделе «Заказы» в <Link to="/account">Личном кабинете</Link>. 
                            Там вы можете узнать статус своего заказа и посмотреть информацию о нем.
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

    const sourcesAmount = (worksType) => {
        switch (worksType) {
            case 'essay':
                return 5;
            case 'coursework':
                return 20;
            case 'article':
                return 25;
            case 'diploma':
                return 50;
            case 'dissertation':
                return 100;
            case 'other':
                return '10. Используйте этот раздел, если вам нужен список литературы для другого типа работы – презентации, исследования и т. п.';
            default: 
                break;
        }
    }

    return (
        <Formik
            initialValues={{
                works: 'essay',
                theme: '',
                amount: '',
                sourcesList: '',
                info: '',
                area: '',
                age: 'no_matter',
                urgency: false,    
                language: false,
                email: ''
            }}
            validationSchema={Yup.object({
                theme: Yup.string()
                    .required('Это обязательное поле'),
                amount: Yup.number()
                    .required('Это обязательное поле')
                    .positive('Значение должно быть больше 0')
                    .max(500, 'Превышено максимальное значение'),
                sourcesList: Yup.string(),
                info: Yup.string(),
                area: Yup.string(),
                urgency: Yup.boolean(),
                language: Yup.boolean(),
                email: Yup.string()
                    .required('Это обязательное поле')
                    .email('Некорректно введен email')
            })}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values) => {
                postOrder({...values, price: calcPrice(values)});
            }}>
            {({ values }) => (
            <Form className="order__form">
                <h3 className="order__title">Заполните данные о вашей работе:</h3>
                <div role="group" aria-labelledby="my-radio-group" className="order__works">
                    <label className="order__radio">
                        <Field type="radio" name="works" value="essay" />
                        Реферат или доклад
                    </label>
                    <label className="order__radio">
                        <Field type="radio" name="works" value="coursework" />
                        Курсовая
                    </label>
                    <label className="order__radio">
                        <Field type="radio" name="works" value="article" />
                        Статья
                    </label>
                    <label className="order__radio">
                        <Field type="radio" name="works" value="diploma" />
                        Диплом
                    </label>
                    <label className="order__radio">
                        <Field type="radio" name="works" value="dissertation" />
                        Диссертация
                    </label>
                    <label className="order__radio">
                        <Field type="radio" name="works" value="other" />
                        Другое
                    </label>
                </div>
                <p className="order__sources-amount">Оптимальное количество источников для этого типа работы – от <span>{sourcesAmount(values.works)}</span></p>
                <div className="order__field">
                    <label htmlFor="theme">Тема работы</label>
                    <Field
                        id="theme"
                        name="theme"
                        type="text"
                        placeholder="Введите название своей работы"
                    />
                    <ErrorMessage className='input-error' component="div" name="theme"  />
                </div>
                <div className="order__field">
                    <label htmlFor="amount">Необходимое количество источников:</label>
                    <Field
                        id="amount"
                        name="amount"
                        type={"number"}
                        placeholder="Введите число"
                    />
                    <ErrorMessage className='input-error' component="div" name="amount"  />
                </div>
                <div className="order__field">
                    <label htmlFor="text">Если у вас есть список, который необходимо дополнить или отредактировать по ГОСТ, вставьте его сюда:</label>
                    <Field
                        id="sourcesList"
                        name="sourcesList"
                        as="textarea"
                        placeholder="Вставьте каждый источник с новой строки"
                    />
                    <ErrorMessage className='input-error' component="div" name="sourcesList"  />
                </div>
                <div className="order__field">
                    <label htmlFor="text">Информация о работе и ключевые слова:</label>
                    <Field 
                        id="info"
                        name="info"
                        as="textarea"
                        placeholder="Напишите примерное содержание работы, чтобы подбор источников был более точным"
                    />
                    <ErrorMessage className='input-error' component="div" name="info"  />
                </div>
                <div className="order__field">
                    <label htmlFor="area">Название предмета или научной области, к которым относится ваша работа:</label>
                    <Field
                        id="area"
                        name="area"
                        type="text"
                        placeholder="Например, социология"
                    />
                    <ErrorMessage className='input-error' component="div" name="area"  />
                </div>
                <div className="order__options">
                    <div className="age__sources">
                        <label htmlFor="age">Возраст источников:</label>
                        <Field
                            id="age"
                            name="age"
                            as="select">
                            <option value="no_matter">Не имеет значения</option>
                            <option value="one">Не старше одного года</option>
                            <option value="five">Не старше пяти лет</option>
                            <option value="ten">Не старше десяти лет</option>
                            <option value="fifteen">Не старше пятнадцати лет</option>
                        </Field>
                        <ErrorMessage className='error' component="div" name="age"  />
                    </div>
                    <div className="order__checkboxes">
                        {values.amount <= 40 ? (
                            <div>
                                <Field type="checkbox" name="urgency" id="urgency"  />
                                <label htmlFor="urgency">Список литературы нужен в течение суток</label>
                            </div>
                        ) : <h4>Если в списке менее 40 источников, можно заказать срочное выполнение в течение одних суток.</h4>}
                        <div>
                            <Field type="checkbox" name="language" id="language" />
                            <label htmlFor="language">Включать в список литературы источники на английском</label>
                        </div>
                    </div>
                </div>
                <div className="order__field">
                    <label htmlFor="email">Ваша электронная почта, на которую будет отправлен готовый список:</label>
                    <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@mail.ru"/>
                    <ErrorMessage className='input-error' component="div" name="email"  />
                </div>
                <hr className="order__line line line-xl" />
                <div className="order__blocks">
                    <div>Стоимость работы: {calcPrice(values)} &#8381;</div>
                    <div>Срок выполнения: в течение {values.urgency ? 'суток' : 'трех суток'} с момента оплаты</div>
                    <ModalButton settings={modalSettings} />
                    <div>
                        Для оплаты вы будете перенаправлены на сервис приема платежей ЮKassa
                        <img src={yookassa} alt="ЮKassa" />
                    </div>
                </div>
                {isLoading ? <SmallSpinner /> : 
                isError ? (
                    <p>
                        Во время оплаты произошла ошибка. Код ошибки: <span>{error}</span><br />
                        Попробуйте повторить попытку позже. Если ошибка не исчезнет, напишите нам, указав в письме код ошибки: 
                        <a href="mailto:info@mybibliography.ru" className="order__mail"> info@mybibliography.ru</a>
                    </p>
                ) : isSuccess ? handleResponse() : (
                    <button className="order__button" type="submit" disabled={isLoading}>
                        Заказать
                        <Icon className="iconify list__icon" icon="system-uicons:arrow-right-circle" />
                    </button>
                )}
                <div className="order__info">
                    <p className="order__oferta">
                        Нажимая «Заказать», вы принимаете условия <Link to={oferta} target="_blank">Публичной оферты</Link>
                    </p>
                    <hr className="order__line line line-md" />
                    <p className="order__questions">
                        Остались вопросы по вашему заказу? Хотите уточнить детали?
                        <br />
                        Напишите нам, и мы поможем.
                    </p>
                    <a href="mailto:info@mybibliography.ru" className="order__mail">info@mybibliography.ru</a>          
                </div>
            </Form>
            )}
        </Formik>
    )
}

export default OrderForm;