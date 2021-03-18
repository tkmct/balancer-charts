import { gql } from '@apollo/client'

export const GET_SWAPS = gql`
  {
    swaps(
      where: {
        tokenIn_in: [
          "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"
          "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        ]
        tokenOut_in: [
          "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
          "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"
        ]
      }
      orderBy: timestamp
    ) {
      id
      tokenIn
      tokenInSym
      tokenAmountIn
      tokenOut
      tokenOutSym
      tokenAmountOut
      timestamp
      value
    }
  }
`

export const GET_POOLS = gql`
  {
    pools {
      id
      finalized
      publicSwap
      swapFee
      totalWeight
      tokensList
      tokens {
        id
        address
        balance
        decimals
        symbol
        denormWeight
      }
    }
  }
`
