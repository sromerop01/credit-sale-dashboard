import { Outlet } from 'react-router-dom'
import styles from './AuthShell.module.css'

export function AuthShell() {
  return (
    <div className={styles.shell}>
      <header className={styles.bar}>
        <div className={styles.logo}>
          <div className={styles.mark}>C</div>
          <span>Credit Sale</span>
        </div>
        <div className={styles.lang}>
          <button className={styles.langItem}>English</button>
          <button className={`${styles.langItem} ${styles.langActive}`}>
            Español
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
