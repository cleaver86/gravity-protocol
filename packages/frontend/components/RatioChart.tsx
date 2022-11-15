import { useEffect, useRef } from 'react'
import {
  Chart,
  ChartData,
  ChartDataset,
  ChartOptions,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  barPercentage: 1,
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
} as ChartOptions<'bar'>

const data = {
  labels: [''],
  datasets: [],
} as ChartData<'bar'>

export type RatioChartProps = {
  datasets: ChartDataset<'bar'>[]
}

/**
 * Component
 */
function RatioChart({ datasets }: RatioChartProps): JSX.Element {
  const chartRef = useRef(null)

  // Hack to allow fluid animations on data change
  useEffect(() => {
    const chart = chartRef.current as null | Chart<'bar'>

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

  return <Bar ref={chartRef} height="20px" data={data} options={options} />
}

export default RatioChart
