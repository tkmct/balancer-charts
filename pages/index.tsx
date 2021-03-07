import { gql, useQuery } from '@apollo/client'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import tokenlist from '../utils/tokenlist'

// get pool pairs
// const POOL_PAIRS = gql``

export default function Home() {
  // const { loading, error, data } = useQuery()
  console.log(tokenlist)

  return (
    <div className={styles.container}>
      <Head>
        <title>Balancer charts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ul>
        {tokenlist.tokens.map((token) => (
          <li key={token.address}>{token.address}</li>
        ))}
      </ul>

      <main className={styles.main}></main>
    </div>
  )
}
