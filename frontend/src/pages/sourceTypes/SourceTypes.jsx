import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import './source-types.scss';

const SourceTypes = ({sourcesList}) => {
    let sourceTypes = {book: [], electronic: [], article: [], document: [], scientific: []}
    for (let type in sourceTypes) {
        sourcesList.map((source) => {
            const link = <Link key={source.path} className="type__link" to={`/${source.path}`}>{source.title}</Link>
            if (source.type === type) {
                sourceTypes[type].push(link)
            };
        });
    };
    return (
        <div className="type">
            <SEO
                title='Типы источников'
                description='Список литературы по ГОСТ: быстрое и грамотное оформление.' />
            <h1 className="type__title">Выберите тип документа</h1>
            <h2 className="type__subtitle">Выберите тип источника, на который хотите оформить ссылку</h2>
            <section className="type__section">
                <h3>Книги</h3>
                {sourceTypes.book}
            </section>
            <section className="type__section">
                <h3>Электронные ресурсы</h3>
                {sourceTypes.electronic}
            </section>
            <section className="type__section">
                <h3>Статьи</h3>
                {sourceTypes.article}
            </section>
            <section className="type__section">
                <h3>Документы</h3>
                {sourceTypes.document}
            </section>
            <section className="type__section">
                <h3>Научная литература</h3>
                {sourceTypes.scientific}
            </section>
        </div>
    )
};
export default SourceTypes;