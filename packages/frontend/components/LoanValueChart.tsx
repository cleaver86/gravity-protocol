import { Chart, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

Chart.register(ArcElement)

/**
 * Component
 */
function LoanValueChart(): JSX.Element {
  return (
    <Doughnut
      data={{
        datasets: [
          {
            data: [10, 85],
            backgroundColor: ['#19F785', '#726C89'],
            borderRadius: 100,
            borderWidth: 0,
          },
          {
            weight: 0.3,
          },
          {
            data: [20, 80],
            backgroundColor: ['#19F785', '#726C89'],
            borderRadius: 100,
            borderWidth: 0,
          },
        ],
      }}
      options={{
        rotation: -90,
        circumference: 180,
        cutout: 110,
      }}
    />
  )
}

export default LoanValueChart
