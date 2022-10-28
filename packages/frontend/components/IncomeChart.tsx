import { useRef } from 'react'
import { Box } from '@chakra-ui/react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  maintainAspectRatio: false,
  borderColor: '#19F785',
  borderWidth: 2,
  backgroundColor: '#19F785',
  pointBackgroundColor: '#251D32',
  pointBorderColor: '#19F785',
  pointBorderWidth: 3,
  pointRadius: 5,
  spanGaps: true,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        borderColor: '#726C89',
        color: '#32274A',
      },
      ticks: {
        color: '#847D9F',
        stepSize: ({ scale: { max } }) => {
          const segments = 5
          const maxValueRounded = Math.round(max / 100) * 100
          return maxValueRounded / segments
        },
      },
    },
    x: {
      grid: {
        borderColor: '#726C89',
        color: '#32274A',
      },
      ticks: {
        color: '#847D9F',
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
}

/**
 * Component
 */

function IncomeChart({ labels, datasets }): JSX.Element {
  const chartRef = useRef(null)

  return (
    <Box height="215px">
      <Line ref={chartRef} options={options} data={{ labels, datasets }} />
    </Box>
  )
}

export default IncomeChart
