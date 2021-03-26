import { Period } from '../constant'
import classNames from 'classnames'
import styles from '../styles/components/PeriodSelector.module.css'

type PeriodButtonProps = {
  label: string
  value: Period
  selected: boolean
  onClick: (period: Period) => void
}

const PeriodButton: React.FC<PeriodButtonProps> = ({
  label,
  value,
  onClick,
  selected
}) => {
  return (
    <button
      className={classNames(styles.period_button, {
        [styles.period_button_selected]: selected
      })}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  )
}

type Props = {
  onSelect: (period: Period) => void
  selected: Period
}

const PeriodSelector: React.FC<Props> = ({ onSelect, selected }) => {
  return (
    <div className={styles.period_selector}>
      <PeriodButton
        label="1 Month"
        value={Period.Month}
        onClick={onSelect}
        selected={selected === Period.Month}
      />
      <PeriodButton
        label="3 Months"
        value={Period.ThreeMonth}
        onClick={onSelect}
        selected={selected === Period.ThreeMonth}
      />
      <PeriodButton
        label="6 Months"
        value={Period.SixMonth}
        onClick={onSelect}
        selected={selected === Period.SixMonth}
      />
    </div>
  )
}

export default PeriodSelector
