import React, { useEffect, useContext, useState } from 'react'
import Chart from 'react-apexcharts'
import moment from 'moment'
import { GlobalStateContext } from '../components/GlobalState'

interface ChartData {
  label: string
  value: number
}

type Easing = 'linear' | 'easein' | 'easeout' | 'easeinout' | undefined
const easyingType: Easing = 'linear'

function Barchart ({ data = [] }: { data: ChartData[] }) {
  const { dateFrom, dateTo } = useContext(GlobalStateContext)
  const [chartData, setChartData] = useState<ChartData[]>(data)

  const [options, setOptions] = useState({
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
      categories: chartData.map((d) => d.label),
    },
  })

  const [series, setSeries] = useState([
    {
      name: 'series-1',
      data: chartData.map((d) => d.value),
    },
  ])

  useEffect(() => {
    if (dateFrom && dateTo) {
      const fromDateString = moment(dateFrom).format('YYYY/MM/DD')
      const toDateString = moment(dateTo).format('YYYY/MM/DD')

      const newData = data.filter(({ label }) => {
        return moment(label, 'YYYY/MM/DD').isBetween(fromDateString, toDateString)
      })
      setChartData(newData)
    }

  }, [data, dateFrom, dateTo])

  useEffect(() => {
    setSeries([{
      name: 'series-1',
      data: chartData.map((d) => d.value),
    }])

    setOptions((prevOptions) => {
      return {
        ...prevOptions,
        xaxis: {
          categories: chartData.map((d) => d.label),
        }
      }
    })
  }, [chartData])


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
