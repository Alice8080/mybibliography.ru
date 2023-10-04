import Logo from '../logo/Logo';
import './footer.scss';

const Footer = () => {
    const currentYear = (new Date()).getFullYear();
    const links = [
        ['Посмотреть список литературы', 'spisok-literatury'],
        ['Заказать список литературы', 'zakazat-spisok-literatury'],
        ['Помощь с курсовыми, контрольными, дипломами ', 'help'],
        ['Найти источники', 'search'],
        ['Оформить ссылку', 'tip-dokumenta'],
        ['Личный кабинет', 'account'],
    ];
    const linksAbout = [
        ['Информация о проекте', 'about'],
        ['Контакты', 'kontakty'],
        ['Правовая информация', 'pravovaya-informaciya'],
    ];
    return (
        <footer className="footer">
            <div className="footer__wrapper">
                {window.location.pathname === '/' ? (
                    <div className="footer__block">
                        <div>
                            <h5>Есть вопросы? Хотите стать нашим партнером?</h5>
                            <p>Напишите нам!</p>
                        </div>
                        <a href="mailto:info@mybibliography.ru" className='footer__mail'>
                            info@mybibliography.ru
                        </a>
                    </div>
                ) : null}

                <div className="footer__top">
                    <div className="footer__info">
                        <Logo />
                        <h6 className="footer__text">
                            <span>My Bibliography</span> — платформа для быстрого оформления списков литературы и поиска источников для научных и учебных работ.
                        </h6>
                    </div>
                    <section className="footer__links">
                        <div className="footer__links-user">
                            <div className="footer__title">Полезные ссылки</div>
                            {links.map((link, index) => <span key={index}><a href={`/${link[1]}`}>{link[0]}</a></span>)}
                        </div>
                        <div className="footer__links-about">
                            <div className="footer__title">О нас</div>
                            {linksAbout.map((link, index) => <span key={index}><a href={`/${link[1]}`}>{link[0]}</a></span>)}
                        </div>
                    </section>
                </div>
                <div className="footer__bottom">
                    <span className="footer__copyright">© My Bibliography 2021-{currentYear}</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;