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

const MoistureGraph = ({ data }) => {
  const dates = data.map(entry => new Date(entry.timestamp).toLocaleDateString());
  const moistureValues = data.map(entry => entry.moisture);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Moisture',
        data: moistureValues,
        fill: false,
        borderColor: 'rgba(255, 159, 64, 1)',
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
          text: 'Moisture',
        },
        min: 0,
        max: Math.max(...moistureValues) * 1.2, // Setting a dynamic max value with some padding
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MoistureGraph;
