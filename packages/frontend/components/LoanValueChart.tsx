import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import { Chart, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { getPersonalLtvColor } from '../utils/general'

Chart.register(ArcElement)

const datasets = [
  {
    id: 'legend',
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
  { id: 'spacer', weight: 0.3 },
  {
    id: 'ltv',
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
]

/**
 * Component
 */

function LoanValueChart({ ltvData, maxLtv, systemLtv }): JSX.Element {
  const chartRef = useRef(null)

  // Hack to allow fluid animations on data change
  useEffect(() => {
    const chart = chartRef.current
    let ltvColor

    if (chart) {
      ltvColor = getPersonalLtvColor(ltvData, systemLtv > 65)
      chart.data.datasets[2].data[0] = maxLtv - ltvData
      chart.data.datasets[2].data[1] = ltvData
      chart.data.datasets[2].backgroundColor[1] = ltvColor
      chart.data.datasets[2].borderColor[1] = ltvColor

      chart.update()
    }
  }, [ltvData, maxLtv])

  return (
    <Box transform="rotateY(180deg);">
      <Doughnut
        ref={chartRef}
        options={{
          responsive: true,
        }}
        data={{
          datasets,
        }}
      />
    </Box>
  )
}

export default LoanValueChart
