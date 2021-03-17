// use tokenlist from @balancer-labs/assets/generated/listed.tokenlist.json
// package name is `assets` because of the way it's installed.
import tokenlist from 'assets/generated/listed.tokenlist.json'

// TODO: [feature] switch chainId
const chain1List = {
  tokens: tokenlist.tokens.filter((token) => token.chainId === 1), // use tokens on mainnet for now.
  ...tokenlist
} as TokenList

export default chain1List

export interface AssetMetadata {
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string | undefined
}

export interface TokenList {
  name: string
  logoURI?: string
  tokens: Token[]
}

interface Token {
  address: string
  chainId: number
  name: string
  symbol: string
  decimals: number
  logoURI?: string
}

interface TokenPair {
  token1: Token
  token2: Token
}

// generate token combinations
// TODO: test
export const tokenPairs: TokenPair[] = chain1List.tokens.flatMap((token1, i) =>
  chain1List.tokens.slice(i + 1).map((token2) => ({
    token1,
    token2
  }))
)

export function getPairName(pair: TokenPair): string {
  return `${pair.token1.symbol} - ${pair.token2.symbol}`
}
