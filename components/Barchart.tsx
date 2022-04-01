import { AppProps } from 'next/app'
import React from 'react'
import Chart from 'react-apexcharts'

interface ChartData {
  label: string
  value: number
}

function Barchart({ data = [] }: { data: ChartData[] }) {
  const [options, setOptions] = React.useState({
    chart: {
      id: 'apexchart-example',
      animations: {
        enabled: true,
        easing: undefined,
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

  React.useEffect(() => {
    setOptions({
      ...options,
      xaxis: {
        categories: data.map((d) => d.label),
      },
    })

    setSeries([
      {
        name: 'series-1',
        data: data.map((d) => d.value),
      },
    ])
  }, [data, options])

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
