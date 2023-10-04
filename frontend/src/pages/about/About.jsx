import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useGetStatisticsQuery } from '../../api/apiSlice';
import { useContent } from "../../hooks/useContent";
import dataSources from '../../components/doughnutChart/dataSources';
import dataRequests from '../../components/doughnutChart/dataRequests';
import DoughnutChart from '../../components/doughnutChart/DoughnutChart';
import BarChart from '../../components/barChart/BarChart';
import SEO from '../../components/SEO';
import './about.scss';
    
const About = () => {
    const response = useGetStatisticsQuery();
    const dataPercents = response?.data?.percents;
    const allSources = response?.data?.all_sources;
    const {renderContent} = useContent();
    const renderInfo = renderContent(response, (
        <>
            <p className="about__text-xl">
                <span>{allSources}</span> источников оформлено за время работы проекта
            </p>
            <DoughnutChart dataPercents={dataPercents} />
            <hr className="about__line line line-md" />
            <p className="about__text-xl">
                В среднем в сутки через сайт оформляется <span>около 1000</span> библиографических ссылок
            </p>
            <BarChart data={dataSources(response?.data?.sources ?? {})} />
            <hr className="about__line line line-md" />
            <p className="about__text-xl">
                Нашей поисковой системой воспользовались <span>{response?.data?.requests ?? 0}</span> раз
            </p>
            <BarChart data={dataRequests(response?.data?.requests ?? 0)} />
            <hr className="about__line line line-md" />
            <p className="about__text-md">
                Мы открыты к сотрудничеству со схожими проектами, рекламодателями и другими организациями. 
                Чтобы связаться с нами, напишите на нашу почту: <Link to="mailto:info@mybibliography.ru">info@mybibliography.ru</Link>                
            </p>
            <hr className="about__line line line-md" />
            <p className="about__github">
                Поставьте <Icon icon="ion:star" /> проекту на Github
                <span>
                    Это самый простой способ сказать нам спасибо, если сайт был вам полезен  :)
                </span>
            </p>
            <a target="_blank" href="https://github.com/Alice8080/mybibliography.ru" rel="noreferrer" className="about__github-link">
                <Icon icon="mdi:github" />
                Github My Bibliography
            </a>
        </>
    ));
    return (
        <div className="about">
            <SEO
                title='Информация о сайте'
                description='Платформа для быстрого оформления библиографических ссылок на источники. Большая база оформленных источников для списков литературы.' />
            <h1 className="about__title">
                О нас
            </h1>
            <h2 className="about__subtitle">
                My Bibliography — это платформа для быстрого оформления списков литературы и поиска источников для научных и учебных работ. 
            </h2>
            <h2 className="about__subtitle">
                Цель проекта — сделать поиск информации простым и эффективным, а работу с источниками — доступной и удобной.
            </h2>
            <h2 className="about__subtitle">
                На этой странице — статистика работы сайта в реальном времени и информация о платформе.
            </h2>
            <hr className="about__line line line-md" />
            {renderInfo}
        </div>
    )
}

export default About;
