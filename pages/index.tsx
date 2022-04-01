import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'

const Barchart = dynamic(() => import('../components/Barchart'), { ssr: false })

const dataset = [
  { label: '1991', value: 30 },
  { label: '1992', value: 40 },
  { label: '1993', value: 35 },
  { label: '1994', value: 50 },
  { label: '1995', value: 49 },
  { label: '1996', value: 60 },
  { label: '1997', value: 70 },
  { label: '1998', value: 91 },
  { label: '1999', value: 125 },
]

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Barchart data={dataset}></Barchart>
      </main>
    </div>
  )
}

export default Home
