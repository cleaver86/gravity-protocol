import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import { Chart, ChartData, ChartOptions, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { getPersonalLtvColor } from '../utils/general'

Chart.register(ArcElement)

const options = {
  responsive: true,
} as ChartOptions<'doughnut'>

const data = {
  datasets: [
    {
      data: [55, 20, 15].reverse(),
      backgroundColor: ['#19F785', '#F7AB19', '#FF505E'].reverse(),
      borderColor: ['#19F785', '#F7AB19', '#FF505E'].reverse(),
      borderRadius: 100,
      borderWidth: 4,
      spacing: 0,
      rotation: -90,
      circumference: 180,
      cutout: 140,
    },
    { data: [], weight: 0.3 }, // Spacer
    {
      data: [],
      backgroundColor: ['#412C64', '#412C64'].reverse(),
      borderColor: ['#412C64', '#412C64'].reverse(),
      borderRadius: 100,
      borderWidth: 15,
      spacing: 0,
      rotation: -90,
      circumference: 180,
      cutout: 115,
    },
  ],
} as ChartData<'doughnut'>

type LoanValueChartProps = {
  personalLtv: number
  maxPersonalLtv: number
  systemLtv: number
}

/**
 * Component
 */

function LoanValueChart({
  personalLtv,
  maxPersonalLtv,
  systemLtv,
}: LoanValueChartProps): JSX.Element {
  const chartRef = useRef(null)

  // Hack to allow fluid animations on data change
  useEffect(() => {
    const chart = chartRef.current as null | Chart<'doughnut'>
    let ltvColor

    if (chart) {
      const ltvDataset = chart.data.datasets[2]
      ltvColor = getPersonalLtvColor(personalLtv, systemLtv > 65)

      ltvDataset.data[0] = maxPersonalLtv - personalLtv
      ltvDataset.data[1] = personalLtv

      if (Array.isArray(ltvDataset.backgroundColor)) {
        ltvDataset.backgroundColor[1] = ltvColor
      }

      if (Array.isArray(ltvDataset.borderColor)) {
        ltvDataset.borderColor[1] = ltvColor
      }

      chart.update()
    }
  }, [personalLtv, maxPersonalLtv, systemLtv])

  return (
    <Box transform="rotateY(180deg);">
      <Doughnut ref={chartRef} options={options} data={data} />
    </Box>
  )
}

export default LoanValueChart
