import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import Select, { createFilter } from 'react-select'
import { getPairName, tokenPairs } from '../utils/tokenlist'
import { formatPriceData } from '../utils/seriesDataGenerator'
import { Period, SUBGRAPH_URL } from '../constant'
import classNames from 'classnames'
import useSwapData from '../hooks/useSwapData'

import Header from '../components/Header'
import SwapVolumeChart from '../components/SwapVolumeChart'
import PeriodSelector from '../components/PeriodSelector'
import PageTitle from '../components/PageTitle'

import styles from '../styles/Home.module.css'
import ChartWarning from '../components/ChartWarning'
import LoadingIndicator from '../components/LoadingIndicator'

const PairPriceChart = dynamic(() => import('../components/PairPriceChart'), {
  ssr: false
})

const client = new ApolloClient({
  uri: SUBGRAPH_URL,
  cache: new InMemoryCache()
})

enum ChartKind {
  Volume,
  Price1,
  Price2
}

const Home = () => {
  const options = tokenPairs.map((pair) => ({
    value: pair,
    label: getPairName(pair)
  }))

  const [pair, setPair] = useState(options[0].value)
  const [period, setPeriod] = useState(Period.Month)
  const [chartKind, setChartKind] = useState(ChartKind.Volume)

  const { loading, error, data } = useSwapData(
    pair.token1.address,
    pair.token2.address,
    client,
    period
  )

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
              {pair.token1.symbol}/{pair.token2.symbol}
            </button>
            <button
              className={classNames(
                styles.chart_select_button,
                chartKind === ChartKind.Price2 &&
                  styles.chart_select_button_selected
              )}
              onClick={() => setChartKind(ChartKind.Price2)}
            >
              {pair.token2.symbol}/{pair.token1.symbol}
            </button>
          </div>
        </div>
        <div className={styles.chart_container}>
          <div className={styles.chart_control}>
            <PeriodSelector onSelect={setPeriod} selected={period} />
          </div>
          {loading ? (
            <LoadingIndicator />
          ) : error ? (
            <ChartWarning text={error} />
          ) : chartKind === ChartKind.Volume ? (
            <SwapVolumeChart data={data} pair={pair} />
          ) : (
            <PairPriceChart
              data={formatPriceData(data, chartKind === ChartKind.Price1)}
              period={period}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default Home
