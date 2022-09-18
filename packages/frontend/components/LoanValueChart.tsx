import { Box } from '@chakra-ui/react'
import { Chart, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

Chart.register(ArcElement)

/**
 * Component
 */
function LoanValueChart(): JSX.Element {
  return (
    <Box transform="rotateY(180deg);">
      <Doughnut
        data={{
          datasets: [
            {
              data: [10, 80, 10].reverse(),
              backgroundColor: ['#19F785', '#726C89', '#342D43'].reverse(),
              borderRadius: 100,
              borderWidth: 0,
              spacing: -60,
              rotation: -95,
              circumference: 190,
            },
            {
              weight: 0.3,
            },
            {
              data: [20, 60, 20].reverse(),
              backgroundColor: ['#19F785', '#726C89', '#342D43'].reverse(),
              borderRadius: 100,
              borderWidth: 0,
              spacing: -60,
              circumference: 187,
              rotation: -93,
            },
          ],
        }}
        options={{
          cutout: 115,
        }}
      />
    </Box>
  )
}

export default LoanValueChart
