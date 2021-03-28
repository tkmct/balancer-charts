// TODO: use environmental variable
export const SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer'

export enum Period {
  Month,
  ThreeMonth,
  SixMonth
}

// constants variables for CSS attributes
// use same tone and manner with balancer exchange app
export const sizes = {
  '--font-size-tiny': '11px',
  '--font-size-small': '14px',
  '--font-size-medium': '16px',
  '--font-size-large': '18px',
  '--font-size-huge': '24px',
  '--font-size-header': '24px',
  '--border-radius-large': '25px',
  '--border-radius-medium': '10px',
  '--border-radius-small': '5px',
  '--block-height': '50px'
}

export const colors = {
  '--background-primary': '#fafafa',
  '--background-secondary': '#fff',
  '--background-control': '#fff',
  '--background-hover': '#f5f5f5',
  '--border': '#e5e5e5',
  '--text-primary': '#21222c',
  '--text-secondary': '#718b98',
  '--success': '#21b66f',
  '--info': '#7685d5',
  '--warning': '#ff9a1a',
  '--error': '#ff5b4c',
  dark: {
    '--background-primary': '#1c1d26',
    '--background-secondary': '#21222c',
    '--background-control': '#1f2029',
    '--background-hover': '#20222c',
    '--border': '#333',
    '--text-primary': '#fff',
    '--text-secondary': '#98aab4',
    '--bar-chart': '#65c0f3'
  }
}
