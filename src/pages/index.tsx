import Head from 'next/head'
import dynamic from 'next/dynamic'
import Select, { createFilter } from 'react-select'
import LoadingIndicator from '../components/LoadingIndicator'

import styles from '../styles/Home.module.css'

import { useState } from 'react'
import { getPairName, tokenPairs } from '../utils/tokenlist'
import {
  ApolloClient,
  ApolloConsumer,
  NormalizedCacheObject
} from '@apollo/client'

const SwapVolumeChart = dynamic(() => import('../components/SwapVolumeChart'), {
  ssr: false
})

export default function Home() {
  const options = tokenPairs.map((pair) => ({
    value: pair,
    label: getPairName(pair)
  }))

  const [pair, setPair] = useState(undefined)

  return (
    <div className={styles.container}>
      <Head>
        <title>Balancer charts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>Balancer Info</header>

      <main className={styles.main}>
        <div className={styles.select_container}>
          {/* TODO: implement Select box from scratch for better performance and fuzzy search */}
          <Select
            filterOption={createFilter({ ignoreAccents: false })}
            options={options}
            onChange={({ value }) => setPair(value)}
          />
        </div>

        <div>
          <ApolloConsumer>
            {(client: ApolloClient<NormalizedCacheObject>) => (
              <SwapVolumeChart pair={pair} apolloClient={client} />
            )}
          </ApolloConsumer>
        </div>
      </main>
    </div>
  )
}
