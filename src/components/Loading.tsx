import styles from '../styles/components/Loading.module.css'

export function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loading}></div>
    </div>
  )
}