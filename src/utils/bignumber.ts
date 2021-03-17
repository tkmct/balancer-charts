import BigNumber from 'bignumber.js'

// use same configuration as balancer-labs/pool-management-vue
BigNumber.config({
  EXPONENTIAL_AT: [-100, 100],
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
  DECIMAL_PLACES: 18
})

export default BigNumber
