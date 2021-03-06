import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
import DatePickerRange from '../components/DatePickerRange'
import moment from 'moment'
import { ChartData } from '../components/Barchart'
import { GlobalStateContext } from '../components/GlobalState'

const Barchart = dynamic(() => import('../components/Barchart'), { ssr: false })

const dataset = [
  { label: '2013/01/01', value: 35 },
  { label: '2014/01/01', value: 50 },
  { label: '2015/01/01', value: 49 },
  { label: '2016/01/01', value: 60 },
  { label: '2021/06/01', value: 80 },
  { label: '2022/01/01', value: 40 },
  { label: '2017/01/01', value: 70 },
  { label: '2018/01/01', value: 91 },
  { label: '2019/01/01', value: 125 },
  { label: '2021/01/01', value: 30 },
]

const Home: NextPage = () => {
  const [renderChart, setRenderChart] = useState(false)
  const [sortedData, setSortedData] = useState<ChartData[] | []>([])

  const { setDateFrom, setDateTo } = React.useContext(GlobalStateContext)

  useEffect(() => {
    setRenderChart(true)
    if (dataset.length > 0 && sortedData.length === 0) {
      const sorted = Array.from(dataset).sort((a: any, b: any) => {
        return moment(a.label, 'YYYY/MM/DD').diff(moment(b.label, 'YYYY/MM/DD'))
      })

      setSortedData(sorted)

      setDateFrom(new Date(sorted[0].label))
      setDateTo(new Date(sorted[sorted.length - 1].label))
    }
  }, [sortedData, setDateFrom, setDateTo])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <DatePickerRange></DatePickerRange>
        {renderChart && <Barchart data={sortedData} />}
      </main>
    </div>
  )
}

export default Home
