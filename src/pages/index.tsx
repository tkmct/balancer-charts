import Head from 'next/head'
import { useState } from 'react'
import {
  ApolloClient,
  ApolloConsumer,
  NormalizedCacheObject
} from '@apollo/client'
import Select, { createFilter } from 'react-select'

import SwapVolumeChart from '../components/SwapVolumeChart'
import PeriodSelector from '../components/PeriodSelector'
import { getPairName, tokenPairs } from '../utils/tokenlist'
import { Period } from '../constant'

import styles from '../styles/Home.module.css'
import PageTitle from '../components/PageTitle'

export default function Home() {
  const options = tokenPairs.map((pair) => ({
    value: pair,
    label: getPairName(pair)
  }))

  const [pair, setPair] = useState(undefined)
  const [period, setPeriod] = useState(Period.Month)

  return (
    <div className={styles.container}>
      <Head>
        <title>Balancer Info</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.header_logo}>Balancer Info</div>
      </header>

      <main className={styles.main}>
        <PageTitle title="Swap Volumes" />
        <div className={styles.select_control}>
          <div className={styles.select_container}>
            {/* TODO: implement Select box from scratch for better performance and fuzzy search */}
            <Select
              filterOption={createFilter({ ignoreAccents: false })}
              options={options}
              onChange={({ value }) => setPair(value)}
              styles={{
                menu: (provided) => ({
                  ...provided,
                  color: 'black'
                })
              }}
            />
          </div>
          <PeriodSelector onSelect={setPeriod} selected={period} />
        </div>
        <div>
          <ApolloConsumer>
            {(client: ApolloClient<NormalizedCacheObject>) => (
              <SwapVolumeChart
                pair={pair}
                period={period}
                apolloClient={client}
              />
            )}
          </ApolloConsumer>
        </div>
      </main>
    </div>
  )
}
