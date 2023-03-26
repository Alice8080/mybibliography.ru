import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const HomeLinks = () => {
    return (
        <>
            <h3 className="home__links-title">Оформить ссылку на:</h3>
            <div className="home__links">
                <Link to='/kniga'>Книгу</Link>
                <Link to='/statya-s-sayta'>Статью с сайта</Link>
                <Link to='/sayt'>Сайт</Link>
                <Link to='/statya-iz-zhurnala'>Статью из журнала</Link>
                <Link to='/posobie'>Пособие</Link>
                <Link to='/statya-iz-elektronnogo-zhurnala'>Статью из электронного журнала</Link>
                <Link to='/gost'>ГОСТ</Link>
                <Link to='/statya-iz-nauchnogo-sbornika'>Статью из научного сборника</Link>
                <Link to='/dissertaciya'>Диссертацию</Link>
                <Link to='/avtoreferat-dissertacii'>Автореферат диссертации</Link>
                <Link to='/patent'>Патент</Link>
                <Link to='/elektronnaya-kniga'>Электронную книгу</Link>
                <Link to='/kniga-bez-avtora'>Книгу без автора</Link>
                <Link to='/tip-dokumenta'>
                    Другой источник
                    <Icon icon="system-uicons:arrow-right" />
                </Link>
            </div>
        </>
    );
};
export default HomeLinks;