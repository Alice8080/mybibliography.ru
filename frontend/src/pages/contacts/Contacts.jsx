import SEO from '../../components/SEO';
import chat from '../../assets/images/chat.png';
import './contacts.scss';

const Contacts = () => {
    return (
        <div className="contacts">
            <SEO
                title='Контакты'
                description='Связаться с администрацией сайта: info@mybibliography.ru' />
            <h1 className="contacts__title">Контакты</h1>
            <div className="contacts__block">
                <div className="contacts__info">
                    <div className="contacts__text">
                        <p className="contacts__connection">Связаться с администрацией:</p>
                        <a className="contacts__email" href="mailto:info@mybibliography.ru">info@mybibliography.ru</a>
                    </div>
                </div>
                <img className="contacts__image" src={chat} />
            </div>
        </div>
    )
}

export default Contacts;