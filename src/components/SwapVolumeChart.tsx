import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { TokenPair } from '../utils/tokenlist'
import { colors, sizes } from '../constant'
import { SwapDataSeries } from '../types'
import dayjs from 'dayjs'

type Props = {
  pair: TokenPair | undefined
  data: SwapDataSeries
}

const SwapVolumeChart: React.FC<Props> = ({ pair, data }) => {
  if (!pair) return <div>Please select pair</div>

  return (
    <div style={{ width: '100%', height: 380 }}>
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
          <CartesianGrid strokeDasharray="4" vertical={false} />
          <XAxis
            dataKey="time"
            tick={{
              fill: colors.dark['--text-secondary'],
              fontSize: sizes['--font-size-medium']
            }}
            tickFormatter={(value) => dayjs(value).format('M/D')}
          />
          <YAxis
            orientation="right"
            axisLine={false}
            tick={{
              fill: colors.dark['--text-secondary'],
              fontSize: sizes['--font-size-medium']
            }}
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
              backgroundColor: colors.dark['--background-secondary'],
              borderRadius: sizes['--border-radius-medium'],
              borderColor: colors.dark['--border'],
              boxShadow: '0 10px 20px rgb(0 0 0 / 10%)'
            }}
            itemStyle={{
              color: colors.dark['--text-primary']
            }}
            labelStyle={{
              color: colors.dark['--text-primary']
            }}
          />
          <Bar
            dataKey="value"
            fill={colors.dark['--bar-chart']}
            fillOpacity="0.8"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SwapVolumeChart
