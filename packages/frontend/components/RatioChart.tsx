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
  maintainAspectRatio: false,
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
function RatioChart({ barPercentage }): JSX.Element {
  const o = { ...options, barPercentage }

  return <Bar height="20px" data={data} options={o} />
}

RatioChart.defaultProps = {
  barPercentage: 1,
}

export default RatioChart
