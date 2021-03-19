import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { useQuery } from '@apollo/client'
import { TokenPair } from '../utils/tokenlist'
import { GET_SWAPS } from '../query'
import { createSwapVolumeSeriesData } from '../utils/seriesDataGenerator'
import LoadingIndicator from './LoadingIndicator'

type Props = {
  pair: TokenPair | undefined
}

const SwapVolumeChart: React.FC<Props> = ({ pair }) => {
  if (!pair) return <div>Please select pair</div>

  const { loading, error, data } = useQuery(GET_SWAPS, {
    variables: {
      token_1: pair.token1.address,
      token_2: pair.token2.address,
      last_timestamp12: 1616039920,
      last_timestamp21: 1616039920
    }
  })

  if (loading) return <LoadingIndicator />

  return (
    <div style={{ width: 500, height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={createSwapVolumeSeriesData(data)}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis
            orientation="right"
            tickFormatter={(value) =>
              new Intl.NumberFormat('en-US', {
                notation: 'compact',
                style: 'currency',
                currency: 'USD'
              }).format(value)
            }
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              `$${Math.round(value).toLocaleString()}`,
              'Volume'
            ]}
          />
          <Area
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity="0.3"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SwapVolumeChart
