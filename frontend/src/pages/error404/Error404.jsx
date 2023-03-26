import { Link } from "react-router-dom"
import SEO from '../../components/SEO';
import './error404.scss';

const Error404 = () => {
    return (
        <section className="error404">
            <SEO
                title='Ошибка 404'
                description='Ошибка загрузки страницы.' />
            <h1>Страница не найдена</h1>
            <h2>
                Такой страницы не существует. Но вы все еще можете посмотреть более интересные части этого сайта.
            </h2>
            <Link className="error404__button" to="/">Перейти на главную страницу</Link>
        </section>
    )
};
export default Error404;