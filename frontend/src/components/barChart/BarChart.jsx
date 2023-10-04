import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './bar-chart.scss';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.defaults.font.size = 16;
ChartJS.defaults.font.family = "Mulish";

const BarChart = ({data}) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    useBorderRadius: true,
                    borderRadius: 5,
                    boxWidth: 20,
                    boxHeight: 20,
                    padding: 20
                }
            },
        },
        borderDash: [15, 5],
        scales: {
            x: {
                grid: {
                    display: false
                },
                border: {
                    color: "#4A4A4A",
                    dash: [2,4],
                },  
            },
            y: {
                grid: {
                    color: "#2B2B2B",
                },
                border: {
                    color: "#4A4A4A",
                    dash: [5,5],
                },  
                ticks: {display: true}
            }
        },
        borderSkipped: false,
        maintainAspectRatio: true,
    };
    
    if (window.matchMedia(`(max-width: 992px)`).matches) {
        options.plugins.legend.position = 'bottom';
    }
    
    if (window.matchMedia(`(max-width: 768px)`).matches) {
        options.barThickness = 50;
    }
    if (window.matchMedia(`(max-width: 576px)`).matches) {
        options.barThickness = 50;
        options.plugins.legend.align = 'center';
        options.plugins.legend.labels.boxWidth = 10;
        options.plugins.legend.labels.boxHeight = 10;
        options.aspectRatio = 1;
    }
    if (window.matchMedia(`(max-width: 480px)`).matches) {
        options.barThickness = 15;
    }

    return (
        <div className="about__bar-chart bar-chart">
            <Bar options={options} data={data} />
        </div>
    );
}

export default BarChart;