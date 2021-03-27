import Head from 'next/head'
import { useState } from 'react'
import {
  ApolloClient,
  ApolloConsumer,
  NormalizedCacheObject
} from '@apollo/client'
import Select, { createFilter } from 'react-select'
import { getPairName, tokenPairs } from '../utils/tokenlist'
import { Period } from '../constant'
import classNames from 'classnames'

import Header from '../components/Header'
import SwapVolumeChart from '../components/SwapVolumeChart'
import PairPriceChart from '../components/PairPriceChart'
import PeriodSelector from '../components/PeriodSelector'
import PageTitle from '../components/PageTitle'

import styles from '../styles/Home.module.css'

enum ChartKind {
  Volume,
  Price1,
  Price2
}

export default function Home() {
  const options = tokenPairs.map((pair) => ({
    value: pair,
    label: getPairName(pair)
  }))

  const [pair, setPair] = useState(options[0].value)
  const [period, setPeriod] = useState(Period.Month)
  const [chartKind, setChartKind] = useState(ChartKind.Volume)

  return (
    <div className={styles.container}>
      <Head>
        <title>Balancer Info</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className={styles.main}>
        <PageTitle title="Swap Volumes" />
        <div className={styles.select_control}>
          <div className={styles.select_container}>
            {/* TODO: implement Select box from scratch for better performance and fuzzy search */}
            <Select
              defaultValue={options[0]}
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
          <div className={styles.chart_kind_selector}>
            <button
              className={classNames(
                styles.chart_select_button,
                chartKind === ChartKind.Volume &&
                  styles.chart_select_button_selected
              )}
              onClick={() => setChartKind(ChartKind.Volume)}
            >
              Volume
            </button>
            <button
              className={classNames(
                styles.chart_select_button,
                chartKind === ChartKind.Price1 &&
                  styles.chart_select_button_selected
              )}
              onClick={() => setChartKind(ChartKind.Price1)}
            >
              Price
            </button>
            <button
              className={classNames(
                styles.chart_select_button,
                chartKind === ChartKind.Price2 &&
                  styles.chart_select_button_selected
              )}
              onClick={() => setChartKind(ChartKind.Price2)}
            >
              Price2
            </button>
          </div>
        </div>
        <div className={styles.chart_container}>
          <div className={styles.chart_control}>
            <PeriodSelector onSelect={setPeriod} selected={period} />
          </div>
          {chartKind === ChartKind.Volume ? (
            <ApolloConsumer>
              {(client: ApolloClient<NormalizedCacheObject>) => (
                <SwapVolumeChart
                  pair={pair}
                  period={period}
                  apolloClient={client}
                />
              )}
            </ApolloConsumer>
          ) : (
            <PairPriceChart />
          )}
        </div>
      </main>
    </div>
  )
}
