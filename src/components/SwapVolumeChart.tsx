import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { TokenPair } from '../utils/tokenlist'
import LoadingIndicator from './LoadingIndicator'
import useSwapData from '../hooks/useSwapData'
import { Period } from '../constant'

type Props = {
  pair: TokenPair | undefined
  period: Period
  apolloClient: ApolloClient<NormalizedCacheObject>
}

const SwapVolumeChart: React.FC<Props> = ({ pair, period, apolloClient }) => {
  if (!pair) return <div>Please select pair</div>

  const { loading, error, data } = useSwapData(
    pair.token1.address,
    pair.token2.address,
    apolloClient,
    period
  )

  if (loading) return <LoadingIndicator />
  if (error) return <div>error fetching data: {JSON.stringify(error)}</div>

  return (
    <div>
      <div style={{ width: 500, height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
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
              formatter={(value: number) => [
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
    </div>
  )
}

export default SwapVolumeChart
