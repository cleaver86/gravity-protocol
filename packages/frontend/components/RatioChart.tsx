import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  indexAxis: 'y' as const,
  responsive: true,
  layout: {
    margin: {
      left: 0,
    },
    padding: {
      left: -20,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      stacked: true,
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
    },
  },
  barPercentage: 0.9,
}

export const data = {
  labels: [''],
  datasets: [
    {
      data: [40],
      backgroundColor: '#D079FF',
      borderWidth: 0,
      borderRadius: {
        topLeft: 100,
        bottomLeft: 100,
      },
      borderSkipped: false,
    },
    {
      data: [40],
      backgroundColor: '#19F785',
      borderWidth: 0,
      borderSkipped: false,
    },
    {
      data: [20],
      backgroundColor: '#F7AB19',
      borderWidth: 0,
      borderRadius: {
        topRight: 100,
        bottomRight: 100,
      },
      borderSkipped: false,
    },
  ],
}

/**
 * Component
 */
function RatioChart(): JSX.Element {
  return <Bar height="12px" data={data} options={options} />
}

export default RatioChart
