import styles from '../styles/components/ChartWarning.module.css'

type Props = {
  text: string
}

const ChartWarning: React.FC<Props> = ({ text }) => {
  return (
    <div className={styles.container}>
      <p>{text}</p>
    </div>
  )
}

export default ChartWarning
