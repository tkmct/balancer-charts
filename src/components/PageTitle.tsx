import styles from '../styles/components/PageTitle.module.css'
import { TokenPair } from '../utils/tokenlist'

type Props = {
  title: string
  pair: TokenPair
}

const PageTitle: React.FC<Props> = ({ title, pair }) => {
  return (
    <h1 className={styles.page_title}>
      {title} {pair.pairName}
      <img
        className={styles.pair_logo_1}
        src={pair.token1.logoURI}
        alt={pair.token1.name}
      />
      <img
        className={styles.pair_logo_2}
        src={pair.token2.logoURI}
        alt={pair.token2.name}
      />
    </h1>
  )
}

export default PageTitle
