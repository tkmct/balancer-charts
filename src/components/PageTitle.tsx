import styles from '../styles/components/PageTitle.module.css'

type Props = {
  title: string
}

const PageTitle: React.FC<Props> = ({ title }) => {
  return <h1 className={styles.page_title}>{title}</h1>
}

export default PageTitle
