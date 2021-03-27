import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { GET_SWAPS } from '../query'
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { createSwapVolumeSeriesData } from '../utils/seriesDataGenerator'
import { Swap, SwapData, SwapDataSeries } from '../types'
import { Period } from '../constant'

function dataRemains(data: {
  swaps12: Swap[]
  swaps21: Swap[]
}): [boolean, boolean] {
  return [data.swaps12.length === 1000, data.swaps21.length === 1000]
}

function compareSwapData(x: SwapData, y: SwapData) {
  if (x.time > y.time) return 1
  if (x.time < y.time) return -1

  return 0
}

function calculateOneMonthBefore(period: Period = Period.Month) {
  const month =
    period === Period.Month ? 1 : period === Period.ThreeMonth ? 3 : 6

  return dayjs().subtract(month, 'month').startOf('day').unix()
}

/**
 * @param token1 address of one side of the pair
 * @param token2 address of the other side of the pair
 * @param apolloClient apolloClient object to fetch data
 * @param period time range. should be one month/ three months/ six months
 *
 * note: volume is calculated by adding up all the value field of swaps in subgraph.
 * price of pair is calculated for each swap data in subgraph. calculated by tokenAmountOut/tokenAmountIn.
 * to use them for candle chart data, chunk them with date (unix time) and get open, high, low and close.
 *
 */
export default function useSwapData(
  token1: string,
  token2: string,
  apolloClient: ApolloClient<NormalizedCacheObject>,
  period: Period
) {
  // get data for one month
  const oneMonthBefore = calculateOneMonthBefore(period)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [result, setResult] = useState<SwapDataSeries>([])

  useEffect(() => {
    // initialize
    setLoading(true)
    setError(null)
    setResult([])

    async function fetchSwaps() {
      let lastId1 = '0'
      let lastId2 = '0'
      let remains = true
      let result: SwapDataSeries = []
      let swapRemains1 = true
      let swapRemains2 = true

      while (remains) {
        const res = await apolloClient.query({
          query: GET_SWAPS,
          variables: {
            token_1: token1,
            token_2: token2,
            last_id_1: lastId1,
            last_id_2: lastId2,
            timestamp: oneMonthBefore
          }
        })

        if (res.error) {
          setError(res.error)
        }

        if (!res.loading) {
          result = createSwapVolumeSeriesData(res.data, result)

          const [swap1Remains, swap2Remains] = dataRemains(res.data)
          swapRemains1 = swap1Remains
          swapRemains2 = swap2Remains
          remains = swapRemains1 || swapRemains2

          // update id
          if (res.data.swaps12.length !== 0) {
            lastId1 = res.data.swaps12[res.data.swaps12.length - 1].id
          }
          if (res.data.swaps21.length !== 0) {
            lastId2 = res.data.swaps21[res.data.swaps21.length - 1].id
          }
        }
      }

      // sort and set result
      result.sort(compareSwapData)

      setResult(result)
      setLoading(false)
    }

    fetchSwaps()
  }, [token1, token2, period])

  return { loading, error, data: result }
}
