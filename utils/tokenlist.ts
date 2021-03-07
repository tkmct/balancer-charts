// use tokenlist from @balancer-labs/assets/generated/listed.tokenlist.json
// package name is `assets` because of the way it's installed.
import tokenlist from 'assets/generated/listed.tokenlist.json'

export default {
  tokens: tokenlist.tokens.filter((token) => token.chainId === 1), // use tokens on mainnet for now.
  ...tokenlist
} as TokenList

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
