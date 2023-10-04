import { useSelector } from "react-redux";
import { ReactComponent as StudiesImg } from '../../assets/images/studies-light-img.svg';
import { ReactComponent as DarkStudiesImg } from '../../assets/images/studies-dark-img.svg';
import { ReactComponent as StudiesCheck } from '../../assets/images/studies-check.svg';
import './studies.scss';

const Studies = () => {
    const { theme } = useSelector(state => state.theme);
    return (
        <section className="studies">
            <div className="studies__img">
                {theme === 'light' ? <StudiesImg /> : <DarkStudiesImg />}
            </div>
            <section className="studies__text">
                <h3>Учеба проще с My Bibliography </h3>
                <ul>
                    <li>
                        <StudiesCheck />
                        <p>Автоматическое оформление ссылок по актуальному
                        ГОСТ Р 7.0.100–2018 «Библиографическая запись.
                        Библиографическое описание. Общие требования
                        и правила составления»</p>
                    </li>
                    <li>
                        <StudiesCheck />
                        <p><a href="search">Поиск</a> оформленных источников</p>
                    </li>
                    <li>
                        <StudiesCheck />
                        <p>Мы поможем <a href="zakazat-spisok-literatury">подобрать и оформить список литературы</a></p>
                    </li>
                    <li>
                        <StudiesCheck />
                        <p><a href="help">Помощь в написании контрольных, рефератов, курсовых, ВКР</a></p>
                    </li>
                </ul>
            </section>
        </section>
    )
};
export default Studies;