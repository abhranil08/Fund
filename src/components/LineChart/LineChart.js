import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = props => {
  const { dataset } = props;

  const labels = dataset.map(d => d['Date']);
  const chartData = dataset.map(d => d['Net Asset Value']);

  const data = {
    labels: labels,
    datasets: [
      {
        label: props.datasetLabel,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartData
      }
    ]
  };

  return (
    <Line data={data} legend={{ position: 'bottom' }}/>
  );
}

export default LineChart;