import { useEffect, useRef } from 'react'
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

const data = {
  labels: [''],
  datasets: [],
}

/**
 * Component
 */
function RatioChart({ datasets, barPercentage }): JSX.Element {
  const o = { ...options, barPercentage }
  const chartRef = useRef(null)

  // Hack to allow fluid animations on data change
  useEffect(() => {
    const chart = chartRef.current

    if (chart) {
      datasets.forEach((dataset, i) => {
        const internalChartDataset = chart.data.datasets[i]

        if (internalChartDataset) {
          internalChartDataset.data = dataset.data
          internalChartDataset.borderRadius = dataset.borderRadius
        } else {
          chart.data.datasets.push(dataset)
        }
      })
      chart.update()
    }
  }, [datasets])

  return <Bar ref={chartRef} height="20px" data={data} options={o} />
}

RatioChart.defaultProps = {
  barPercentage: 1,
}

export default RatioChart
