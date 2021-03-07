import Head from 'next/head'
import Select, { createFilter } from 'react-select'

import { getPairName, tokenPairs } from '../utils/tokenlist'

import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

export default function Home() {
  const options = tokenPairs.map((pair) => ({
    value: pair,
    label: getPairName(pair)
  }))

  const [pair, setPair] = useState(undefined)
  const [data, setData] = useState({ data: undefined })

  useEffect(() => {
    const fetchData = async () => {
      // TODO: setData
      console.log('fetch data')
    }

    fetchData()
  }, [pair])

  return (
    <div className={styles.container}>
      <Head>
        <title>Balancer charts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.select_container}>
          {/* TODO: implement Select box from scratch for better performance and fuzzy search */}
          <Select
            filterOption={createFilter({ ignoreAccents: false })}
            options={options}
            onChange={(pair) => setPair(pair)}
          />
        </div>
      </main>
    </div>
  )
}
