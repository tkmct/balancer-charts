export type Swap = {
  id: string
  tokenIn: string
  tokenInSym: string
  tokenAmountIn: number
  tokenOut: string
  tokenOutSym: string
  tokenAmountOut: number
  timestamp: number
  value: number
}

// time is represented as time string 'YYYY-MM-DD'
export type SwapData = { time: string; value: number }
export type SwapDataSeries = SwapData[]
