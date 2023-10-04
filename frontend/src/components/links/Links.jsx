import { Icon } from '@iconify/react';
import linksImg from '../../assets/images/links-img.svg';
import './links.scss';

const Links = () => {
    const buttons = [
        ['Книгу', 'kniga'],
        ['Статью с сайта', 'statya-s-sayta'],
        ['Статью из журнала', 'statya-iz-zhurnala'],
        ['Сайт', 'sayt'],
        ['Книгу без автора', 'kniga-bez-avtora'],
        ['Статью из электронного журнала', 'statya-iz-elektronnogo-zhurnala'],
        ['ГОСТ', 'gost'],
        ['Диссертацию', 'dissertaciya'],
        ['Автореферат диссертации', 'avtoreferat-dissertacii'],
        ['Патент', 'patent'],
        ['Пособие', 'posobie'],
        ['Статью из научного сборника', 'statya-iz-nauchnogo-sbornika'],
    ];
    return (
        <section className="links">
            <div className="links__left">
                <img src={linksImg} alt="" />
                <h3>
                    <span>500 000 +</span>
                    ссылок уже
                    офомили с
                    My Bibliography
                </h3>
            </div>
            <hr />
            <div className="links__right">
                <h3>Оформить ссылку на:</h3>
                <div className="links__buttons">
                    {buttons.map((link, index) => <a key={index} href={`/${link[1]}`}>{link[0]}</a>)}
                    <a href="/tip-dokumenta">Другой источник <Icon icon="system-uicons:chevron-right" /></a>
                </div>
            </div>
        </section>
    )
};
export default Links;