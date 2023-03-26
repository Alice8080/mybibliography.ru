import { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './doughnut-chart.scss';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.overrides['doughnut'].plugins.legend.display = false;

const DoughnutChart = ({dataPercents}) => {
  const sources = dataPercents;
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
              let label = context.dataset.label || '';
              return label 
            }
          }
      },
    },
  };

  const data = {
    labels: ['Остальные источники', 'Сайты', 'Статьи с сайтов', 'Статьи из журналов', 'Книги'],
    datasets: [
      {
        label: '',
        data: [sources.others, sources.sites, sources.site_articles, sources.magazine_articles, sources.books],
        backgroundColor: [
          '#FF753E',
          '#F3645B',
          '#E55C8C',
          '#C349FF',
          '#801DFF',
        ],
        hoverBackgroundColor: [
          '#FF753E',
          '#F3645B',
          '#E55C8C',
          '#C349FF',
          '#801DFF',
        ],
        borderColor: '#0E0E10',
        hoverBorderColor: '#0E0E10',
        borderWidth: 15,
        borderRadius: 28,
        hoverOffset: 28,
        rotation: 5
      },
    ],
  };

  const mediaParams = [
    {
      maxWidth: 1200,
      borderWidth: 18,
      borderRadius: 25,
      hoverOffset: 25
    },
    {
      maxWidth: 992,
      borderWidth: 16,
      borderRadius: 22,
      hoverOffset: 22
    },
    {
      maxWidth: 768,
      borderWidth: 12,
      borderRadius: 20,
      hoverOffset: 20
    },
    {
      maxWidth: 576,
      borderWidth: 11,
      borderRadius: 15,
      hoverOffset: 15
    },
    {
      maxWidth: 480,
      borderWidth: 8,
      borderRadius: 10,
      hoverOffset: 10
    },
  ];

  for (let param of mediaParams) {
    if (window.matchMedia(`(max-width: ${param.maxWidth}px)`).matches) {
      data.datasets[0].borderWidth = param.borderWidth;
      data.datasets[0].borderRadius = param.borderRadius;
    }
  }

  const others = useRef(null);
  const magazineArticles = useRef(null);
  const siteArticles = useRef(null);
  const books = useRef(null);
  const sites = useRef(null);

  function drawLine(ref, moveTo, lineTo) {
    const ctxBooks = ref.current.getContext('2d');
    ctxBooks.beginPath(); 
    ctxBooks.moveTo(...moveTo); 
    ctxBooks.lineTo(...lineTo); 
    ctxBooks.lineWidth = 4;
    ctxBooks.setLineDash([6, 5]);
    ctxBooks.strokeStyle = "#7C7C7C";
    ctxBooks.stroke(); 
  }

  const lines = [
    {
      ref: books,
      moveTo: [0, 60],
      lineTo: [280, 120]
    },
    {
      ref: magazineArticles,
      moveTo: [0, 70],
      lineTo: [280, 70]
    },
    {
      ref: siteArticles,
      moveTo: [0, 60],
      lineTo: [320, 0]
    },
    {
      ref: others,
      moveTo: [10, 140],
      lineTo: [290, 70]
    },
    {
      ref: sites,
      moveTo: [0, 0],
      lineTo: [290, 100]
    },
  ]

  useEffect(() => {
    for (let line of lines) {
      drawLine(line.ref, line.moveTo, line.lineTo);
    }
  }, []);

  return (
    <div className="about__dougnut doughnut">
        <div className="doughnut__legend doughnut__books">
            <div className="doughnut__text">
                <span>{sources.books}%</span>
                <p>Книги</p>
            </div>
            <canvas className='canvas' ref={books}></canvas>
        </div>
        <div className="doughnut__legend doughnut__magazine-articles">
            <div className="doughnut__text">
                <span>{sources.magazine_articles}%</span>
                <p>Статьи из журналов</p>
            </div>
            <canvas className='canvas' ref={magazineArticles}></canvas>
        </div>
        <div className="doughnut__legend doughnut__site-articles">
            <div className="doughnut__text">
                <span>{sources.site_articles}%</span>
                <p>Статьи с сайтов</p>
            </div>
            <canvas className='canvas' ref={siteArticles}></canvas>
        </div>
        <div className='doughnut__graph'>
            <Doughnut options={options} data={data} />
        </div>
        <div className="doughnut__legend doughnut__others">
            <canvas className='canvas' ref={others}></canvas>
            <div className="doughnut__text">  
                <span>{sources.others}%</span>
                <p>Остальные источники</p>
            </div>
        </div>
        <div className="doughnut__legend doughnut__sites">
            <canvas className='canvas' ref={sites}></canvas>
            <div className="doughnut__text">
                <span>{sources.sites}%</span>
                <p>Сайты</p>
            </div>
        </div>
      </div>
  );
};
export default DoughnutChart;