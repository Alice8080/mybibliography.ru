import { Link } from 'react-router-dom';
import soglashenie from '../../assets/documents/polzovatelskoe-soglashenie.pdf';
import oferta from '../../assets/documents/publichnaya-oferta.pdf';
import politika from '../../assets/documents/politika-konfidencialnosti.pdf';
import SEO from '../../components/SEO';
import './legal-info.scss';

const LegalInfo = () => {
    return (
        <section className="legal-info">
            <SEO
                title='Правовая информация'
                description='Пользовательское соглашение, Политика конфиденциальности, Публичная оферта.' />
            <h1 className="legal-info__title">Правовая информация</h1>
            <div className="legal-info__info">
                <ul className="legal-info__list">
                    <li className="legal-info__item">
                        <Link to={soglashenie} target="_blank" className="legal-info__link">Пользовательское соглашение</Link>
                    </li>
                    <li className="legal-info__item">
                        <Link to={politika} target="_blank" className="legal-info__link">Политика конфиденциальности</Link>
                    </li>
                    <li className="legal-info__item">
                        <Link to={oferta} target="_blank" className="legal-info__link">Публичная оферта</Link>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default LegalInfo;