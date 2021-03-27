import { gql } from '@apollo/client'

export const GET_SWAPS = gql`
  query SwapPair(
    $token_1: Bytes
    $token_2: Bytes
    $last_id_1: ID
    $last_id_2: ID
    $timestamp: Int
  ) {
    swaps12: swaps(
      first: 1000
      where: {
        tokenIn: $token_1
        tokenOut: $token_2
        timestamp_gt: $timestamp
        id_gt: $last_id_1
      }
      orderBy: id
      orderDirection: asc
    ) {
      id
      tokenInSym
      tokenAmountIn
      tokenOutSym
      tokenAmountOut
      timestamp
      value
    }
    swaps21: swaps(
      first: 1000
      where: {
        tokenIn: $token_2
        tokenOut: $token_1
        timestamp_gt: $timestamp
        id_gt: $last_id_2
      }
      orderBy: id
      orderDirection: asc
    ) {
      id
      tokenInSym
      tokenAmountIn
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
