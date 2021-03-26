import styles from '../styles/components/LoadingIndicator.module.css'

const LoadingIndicator = () => (
  <div className={styles.container}>
    <div className={styles.loading_text}>Loading...</div>
  </div>
)

export default LoadingIndicator
