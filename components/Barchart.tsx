import React from 'react'
import Chart from 'react-apexcharts'
import moment from 'moment'
import { GlobalStateContext } from '../components/GlobalState'

interface ChartData {
  label: string
  value: number
}

type Easing = 'linear' | 'easein' | 'easeout' | 'easeinout' | undefined
const easyingType: Easing = 'linear'

function Barchart({ data = [] }: { data: ChartData[] }) {
  const { dateFrom, dateTo } = React.useContext(GlobalStateContext)

  data = data.filter(({ label }) => {
    console.log(label)
    return moment(label, 'YYYY/MM/DD').isBetween(dateFrom, dateTo)
  })

  const [options, setOptions] = React.useState({
    chart: {
      id: 'apexchart-example',
      animations: {
        enabled: true,
        easing: easyingType,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 300,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    xaxis: {
      categories: data.map((d) => d.label),
    },
  })

  const [series, setSeries] = React.useState([
    {
      name: 'series-1',
      data: data.map((d) => d.value),
    },
  ])

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width={500}
      height={320}
    />
  )
}

export default Barchart
