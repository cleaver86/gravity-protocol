import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { Chart, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

Chart.register(ArcElement)

/**
 * Component
 */

function LoanValueChart(): JSX.Element {
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    setAnimate(false)
  }, [])

  return (
    <Box transform="rotateY(180deg);">
      <Doughnut
        options={{
          animation: { duration: animate === false ? 0 : 1000 },
          responsive: true,
        }}
        data={{
          datasets: [
            {
              data: [55, 30, 10].reverse(),
              backgroundColor: ['#19F785', '#F7AB19', '#FF505E'].reverse(),
              borderColor: ['#19F785', '#F7AB19', '#FF505E'].reverse(),
              borderRadius: 100,
              borderWidth: 4,
              spacing: 0,
              rotation: -90,
              circumference: 180,
              cutout: 140,
            },
            { weight: 0.3 },
            {
              data: [20, 80].reverse(),
              backgroundColor: ['#19F785', '#412C64'].reverse(),
              borderColor: ['#19F785', '#412C64'].reverse(),
              borderRadius: 100,
              borderWidth: 15,
              spacing: 0,
              rotation: -90,
              circumference: 180,
              cutout: 115,
            },
          ],
        }}
      />
    </Box>
  )
}

export default LoanValueChart
