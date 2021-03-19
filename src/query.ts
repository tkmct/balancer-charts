import { gql } from '@apollo/client'

export const GET_SWAPS = gql`
  query SwapPair(
    $token_1: Bytes!
    $token_2: Bytes!
    $last_timestamp12: Int
    $last_timestamp21: Int
  ) {
    swaps12: swaps(
      first: 1000
      where: {
        tokenIn: $token_1
        tokenOut: $token_2
        timestamp_lt: $last_timestamp12
      }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      tokenInSym
      tokenOutSym
      timestamp
      value
    }
    swaps21: swaps(
      first: 1000
      where: {
        tokenIn: $token_2
        tokenOut: $token_1
        timestamp_lt: $last_timestamp21
      }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      tokenInSym
      tokenOutSym
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
