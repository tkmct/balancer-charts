import dayjs from 'dayjs'
import { Swap, SwapData, SwapDataSeries } from '../types'

// create swap volume data to use in VolumeChart
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
      result[v.time] = { time: v.time, value: v.value }
    })
  }

  // calculate volume in each period
  data.swaps12.forEach((swap) => {
    const key = dayjs.unix(Number(swap.timestamp)).format('YYYY-MM-DD')
    const row = result[key]
    if (!row) {
      result[key] = { time: key, value: Number(swap.value) }
    } else {
      result[key].value += Number(swap.value)
    }
  })

  data.swaps21.forEach((swap) => {
    const key = dayjs.unix(Number(swap.timestamp)).format('YYYY-MM-DD')
    const row = result[key]
    if (!row) {
      result[key] = { time: key, value: Number(swap.value) }
    } else {
      result[key].value += Number(swap.value)
    }
  })

  return Object.keys(result).map((k) => ({
    ...result[k],
    value: Math.round(result[k].value)
  }))
}
