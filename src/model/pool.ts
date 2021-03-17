import BigNumber from '../utils/bignumber'

// token of a pool
export interface PoolToken {
  id: string
  poolId: string
  symbol: string
  name: string
  decimal: number
  address: string
  balance: BigNumber // locked balance of this token in a pool
  denormWeight: BigNumber // weight of this token in a pool
}

// not using all properties of Pool model from balancer-subgraph.
// just use some of the properties to calculate volume and liquidity.
// TODO: auto generate from graphql schema
export class Pool {
  id: string
  tokens: PoolToken[]
  liquidity: BigNumber

  constructor(id: string, tokens: PoolToken[], liquidity: BigNumber) {
    this.id = id
    this.tokens = tokens
    this.liquidity = liquidity
  }

  public liquidityOfPair(token1: string, token2: string): BigNumber {
    return new BigNumber(0)
  }
}
