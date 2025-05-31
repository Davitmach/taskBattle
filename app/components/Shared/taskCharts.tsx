import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const CustomChart = ({ dataPoints, labels }:{dataPoints:number[],labels:number[]}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Count',
        data: dataPoints,
        fill: false,
        borderWidth: 2,           
        borderColor: '#d9d9d9',
        backgroundColor: '#d9d9d9',
        tension: 0,
        pointRadius: 3,
        pointHoverRadius: 5,
        
        pointBorderColor: '#d9d9d9',
        pointBackgroundColor: '#d9d9d9',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false  ,
          color: '#ffffff20',  // вертикальная сетка
        },
        ticks: {
          color: '#d9d9d9',
          font: {
            family: 'Tektur, sans-serif',
          },
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        grid: {
          display: false,      // полностью убираем горизонтальные линии
          drawTicks:  false,     // показываем только риски
        },
        ticks: {
          display: true,
          color: '#d9d9d9',
          font: {
            family: 'Tektur, sans-serif',
          },
          stepSize: 9,
          maxRotation: 0,
          minRotation: 0,
          
        },
        min:0,
    beginAtZero: true, 
      // suggestedMin: -2,  
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        titleFont: {
          family: 'Tektur, sans-serif',
        },
        bodyFont: {
          family: 'Tektur, sans-serif',
        },
      },
    },
  };

  return (
    <div style={{
      backgroundColor: '#2D2D4F',
      
      borderRadius: '8px',
    
      width: '100%',
      fontFamily: 'Tektur, sans-serif',
    }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default CustomChart;
