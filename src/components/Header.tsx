import styles from '../styles/components/Header.module.css'
import BrandIcon from '../assets/brandIcon.svg'

const Header = () => (
  <header className={styles.header}>
    <div className={styles.header_logo}>
      <BrandIcon style={{ width: '26px', marginRight: '8px' }} />
      <div>Balancer Info</div>
    </div>

    <div className={styles.header_links}>
      <a
        className={styles.header_link}
        href="https://balancer.exchange"
        target="blank"
      >
        Trade
      </a>
      <a
        className={styles.header_link}
        href="https://pools.balancer.exchange"
        target="blank"
      >
        Invest
      </a>
    </div>
  </header>
)

export default Header
