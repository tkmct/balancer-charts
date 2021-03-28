import { getPairName, TokenPair, tokenPairs } from '../utils/tokenlist'
import Fuse from 'fuse.js'
import { Search } from 'react-feather'

import styles from '../styles/components/PairSelector.module.css'
import { useEffect, useState, useRef } from 'react'

type PairItemProps = { pair: TokenPair; onClick: (pair: TokenPair) => void }

const PairItem: React.FC<PairItemProps> = ({ pair, onClick }) => {
  return (
    <div
      key={pair.pairName}
      className={styles.suggestion_item}
      onClick={() => onClick(pair)}
    >
      {pair.pairName}
    </div>
  )
}

type Props = {
  onSelect: (selected: TokenPair) => void
}

const PairSelector: React.FC<Props> = ({ onSelect }) => {
  const options = {
    keys: ['pairName', 'pairNameReverse', 'token1.symbol', 'token2.symbol']
  }
  const fuse = new Fuse(tokenPairs, options)

  const [value, setValue] = useState('')
  const [suggested, setSuggested] = useState([])
  const [focused, setFocused] = useState(false)

  // detect click outside and remove focus
  const containerRef = useRef<HTMLDivElement>()
  const suggestionRef = useRef<HTMLDivElement>()

  const handleClick = (e) => {
    if (
      !(suggestionRef.current && suggestionRef.current.contains(e.target)) &&
      !(containerRef.current && containerRef.current.contains(e.target))
    ) {
      setFocused(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })

  // update suggestion data
  useEffect(() => {
    const result = fuse.search(value)
    setSuggested(result.slice(0, 10).map((r) => r.item))
  }, [value])

  return (
    <div>
      <div className={styles.container} ref={containerRef}>
        <input
          value={value}
          className={styles.input}
          placeholder="Search pair"
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
        />
        <Search />
      </div>
      {focused && suggested.length > 0 && (
        <div className={styles.suggestion_field} ref={suggestionRef}>
          {suggested.map((item) => (
            <PairItem
              pair={item}
              onClick={(pair) => {
                onSelect(pair)
                setValue(pair.pairName)
                setFocused(false)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default PairSelector
