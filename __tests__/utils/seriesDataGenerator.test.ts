import { createSwapVolumeSeriesData } from '../../src/utils/seriesDataGenerator'
import { Swap } from '../../src/types'

describe('seriesDataGenerator', () => {
  test.todo('createSwapVolumeSeriesData', () => {
    const data: { swaps12: Swap[]; swaps21: Swap[] } = {
      swaps12: [],
      swaps21: []
    }
    createSwapVolumeSeriesData(data)
  })
})
