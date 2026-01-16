import Link from "next/link"
import styles from "../Header/Header.module.scss"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            Ticket<span>Flow</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/tickets">Meus Tickets</Link>
        </nav>

        <div className={styles.actions}>
          <button className={styles.loginBtn}>Entrar</button>
        </div>
      </div>
    </header>
  )
}
