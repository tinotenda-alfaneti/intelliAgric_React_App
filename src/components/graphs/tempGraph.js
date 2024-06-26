import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const TemperatureGraph = ({ data }) => {
  const dates = data.map(entry => new Date(entry.timestamp).toLocaleDateString());
  const temperatures = data.map(entry => entry.temp);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Temperature',
        data: temperatures,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature',
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TemperatureGraph;
