import Chart from 'react-apexcharts'
import dayjs from 'dayjs'
import { colors, Period, sizes } from '../constant'

type Props = {
  data: Array<{
    name: string
    data: Array<{
      x: string
      y: number[]
    }>
  }>
  period: Period
}

function getTickAmountFromPeriod(period: Period): number {
  if (period === Period.Month) {
    return 6
  }
  if (period === Period.ThreeMonth) {
    return 18
  }

  return 36
}

const PairPriceChart: React.FC<Props> = ({ data, period }) => {
  const options = {
    chart: {
      type: 'candlestick'
    },
    title: {
      text: 'Price',
      align: 'right'
    },
    tooltip: {
      custom: function ({ seriesIndex, dataPointIndex, w }) {
        const date = w.globals.initialSeries[seriesIndex].data[dataPointIndex].x
        const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex]
        const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]
        const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]
        const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]
        const formatValue = (v) =>
          typeof v === 'number' ? v.toPrecision(6) : '-'
        return `
          <div class="tooltip-container">
          <div class="tooltip-title">${dayjs(date).format('YYYY/M/D')}</div>
          <div>
          Open: <span class="value">${formatValue(o)}</span>
          </div>
          <div>
          High: <span class="value">${formatValue(h)}</span>
          </div>
           <div>
          Low: <span class="value">${formatValue(l)}</span>
          </div>
           <div>
          Close: <span class="value">${formatValue(c)}</span>
          </div>
          </div>
          `
      },
      theme: 'dark',
      enabled: true,
      x: {
        show: true
      }
    },
    grid: {
      strokeDashArray: 4
    },
    xaxis: {
      type: 'category',
      labels: {
        rotateAlways: false,
        rotate: 0,
        formatter: function (val) {
          return dayjs(val).format('M/D')
        },
        style: {
          fontSize: sizes['--font-size-medium'],
          colors: colors.dark['--text-secondary']
        }
      },
      axisTicks: {
        show: true
      },
      tickAmount: getTickAmountFromPeriod(period)
    },
    yaxis: {
      opposite: true,
      tooltip: {
        enabled: true
      },
      labels: {
        formatter: function (val) {
          return new Intl.NumberFormat('en-US', {
            notation: 'compact'
          }).format(val)
        },
        style: {
          fontSize: sizes['--font-size-medium'],
          colors: colors.dark['--text-secondary']
        }
      }
    }
  }
  return (
    <div style={{ width: '100%', height: 400 }}>
      <Chart series={data} options={options} type="candlestick" height="400" />
    </div>
  )
}

export default PairPriceChart
