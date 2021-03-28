# Balancer charts

This project is to show volume and price information of trading pairs on balancer protocol.
DEMO: https://kind-mcnulty-b01c6e.netlify.app

## Future development plans

- Implement liquidity volume chart (this might be little bit difficult because it's not straightforward to define volume of liquidity of single pair in balancer protocol.)
- Display more information for pair
  - ex) 24h swap volume change, liquidity volume change
- Enable to display hourly/weekly chart
  - in current implementation, it only shows daily data for every chart. It's important to make chart interval configurable
- Enable to display longer time period data
  - currently, it only displays one month/three months/six months chart. It might be better to display one year data or even all time data.
- Performance improvements
  - Improve data fetching performance. currently, it takes long to fetch 6 months data because of the scheme of balancer subgraph. it might be possible to optimize subgraph scheme to fetch data more efficiently. (I'd like to talk to the team about this if possible)
- Code quality
  - Adding more tests for better maintainability

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
