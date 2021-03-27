import Chart from 'react-apexcharts'
import dayjs from 'dayjs'

type Props = {
  data: Array<{
    time: string
    high: number
    low: number
    open: number
    close: number
  }>
}

const PairPriceChart: React.FC<Props> = ({ data }) => {
  const options = {
    chart: {
      type: 'candlestick'
    },
    title: {
      text: 'Price',
      align: 'right'
    },
    annotations: {
      xaxis: [
        {
          x: 'Oct 06 14:00',
          borderColor: '#00E396',
          label: {
            borderColor: '#00E396',
            style: {
              fontSize: '12px',
              color: '#fff',
              background: '#00E396'
            },
            orientation: 'horizontal',
            offsetY: 7,
            text: 'Annotation Test'
          }
        }
      ]
    },
    tooltip: {
      enabled: true
    },
    xaxis: {
      type: 'category',
      labels: {
        formatter: function (val) {
          return dayjs(val).format('M/DD')
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        formatter: function (val) {
          return Math.round(val)
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
