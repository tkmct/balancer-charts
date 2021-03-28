// use tokenlist from @balancer-labs/assets/generated/listed.tokenlist.json
// package name is `assets` because of the way it's installed.
import tokenlist from 'assets/generated/listed.tokenlist.json'

// TODO: [feature] switch chainId
const chain1List = {
  ...tokenlist,
  tokens: tokenlist.tokens.filter((token) => token.chainId === 1) // use tokens on mainnet for now.
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

export interface Token {
  address: string
  chainId: number
  name: string
  symbol: string
  decimals: number
  logoURI?: string
}

export interface TokenPair {
  pairName: string
  pairNameReverse: string // for search purpose
  token1: Token
  token2: Token
}

// generate token combinations
// TODO: test
export const tokenPairs: TokenPair[] = chain1List.tokens.flatMap((token1, i) =>
  chain1List.tokens
    .slice(i + 1)
    .filter((token2) => token1.symbol !== token2.symbol)
    .map((token2) => ({
      pairName: `${token1.symbol}/${token2.symbol}`,
      pairNameReverse: `${token2.symbol}/${token1.symbol}`,
      token1,
      token2
    }))
)

export function getPairName(pair: TokenPair): string {
  return `${pair.token1.symbol} - ${pair.token2.symbol}`
}
