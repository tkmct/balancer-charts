import {
  BarChart,
  Bar,
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
import { SwapDataSeries } from '../types'
import ChartWarning from './ChartWarning'

type Props = {
  pair: TokenPair | undefined
  period: Period
  apolloClient: ApolloClient<NormalizedCacheObject>
}

function noData(data: SwapDataSeries): boolean {
  return data.length === 0
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
  if (noData(data))
    return <ChartWarning text="Not enough data available for this interval" />

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <CartesianGrid strokeDasharray="4 4" />
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
            contentStyle={{
              backgroundColor: '#21222c',
              borderRadius: '8px',
              borderColor: '#333',
              boxShadow: '0 10px 20px rgb(0 0 0 / 10%)'
            }}
            itemStyle={{
              color: '#fff'
            }}
            labelStyle={{
              color: '#fff'
            }}
          />
          <Bar dataKey="value" fill="#65c0f3" fillOpacity="0.8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SwapVolumeChart
