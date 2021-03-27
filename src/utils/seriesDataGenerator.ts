import dayjs from 'dayjs'
import { Swap, SwapData, SwapDataSeries } from '../types'

// create swap volume data to use in VolumeChart
// TODO: write test.
export function createSwapVolumeSeriesData(
  data?: {
    swaps12: Swap[]
    swaps21: Swap[]
  },
  target?: SwapDataSeries
): SwapDataSeries {
  if (!data) return []
  const result: { [key: string]: SwapData } = {}

  if (target) {
    target.forEach((v) => {
      result[v.time] = {
        time: v.time,
        value: v.value,
        ohlc1: v.ohlc1,
        ohlc2: v.ohlc2
      }
    })
  }

  // calculate volume and ohlc in each period
  // TODO: testing
  function updateSwapData(swap: Swap, isSwap1: boolean) {
    const timestamp = Number(swap.timestamp)
    const day = dayjs.unix(timestamp).format('YYYY-MM-DD')
    const row = result[day]

    const price = Number(swap.tokenAmountOut) / Number(swap.tokenAmountIn)

    // if no data has been added to this day
    if (!row) {
      // add to new key
      // ts: ignore
      result[day] = isSwap1
        ? {
            time: day,
            value: Number(swap.value),
            ohlc1: {
              opentime: timestamp,
              closetime: timestamp,
              open: price,
              high: price,
              low: price,
              close: price
            },
            // set to default value
            ohlc2: {}
          }
        : {
            time: day,
            value: Number(swap.value),
            ohlc2: {
              opentime: timestamp,
              closetime: timestamp,
              open: price,
              high: price,
              low: price,
              close: price
            },
            // set to default value
            ohlc1: {}
          }
    } else {
      // update to existing date
      result[day].value += Number(swap.value)
      const turn = isSwap1 ? 'ohlc1' : 'ohlc2'
      // update ohlc1
      // check highest
      if (
        result[day][turn].high === undefined ||
        (result[day][turn] && price > result[day][turn].high)
      ) {
        result[day][turn].high = price
      }
      if (
        result[day][turn].low === undefined ||
        (result[day][turn] && price < result[day][turn].low)
      ) {
        result[day][turn].low = price
      }
      if (
        result[day][turn].open === undefined ||
        (result[day][turn] && timestamp < result[day][turn].opentime)
      ) {
        result[day][turn].open = price
        result[day][turn].opentime = timestamp
      }
      if (
        result[day][turn].close === undefined ||
        (result[day][turn] && timestamp > result[day][turn].closetime)
      ) {
        result[day][turn].close = price
        result[day][turn].closetime = timestamp
      }
    }
  }

  data.swaps12.forEach((swap) => updateSwapData(swap, true))
  data.swaps21.forEach((swap) => updateSwapData(swap, false))

  return Object.keys(result).map((k) => ({
    ...result[k],
    value: Math.round(result[k].value)
  }))
}
