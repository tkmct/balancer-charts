import { Period } from '../constant'

type PeriodButtonProps = {
  label: string
  value: Period
  onClick: (period: Period) => void
}

const PeriodButton: React.FC<PeriodButtonProps> = ({
  label,
  value,
  onClick
}) => {
  return <button onClick={() => onClick(value)}>{label}</button>
}

type Props = {
  onSelect: (period: Period) => void
}

const PeriodSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div>
      <PeriodButton label="1 Month" value={Period.Month} onClick={onSelect} />
      <PeriodButton
        label="3 Month"
        value={Period.ThreeMonth}
        onClick={onSelect}
      />
      <PeriodButton
        label="6 Month"
        value={Period.SixMonth}
        onClick={onSelect}
      />
    </div>
  )
}

export default PeriodSelector
