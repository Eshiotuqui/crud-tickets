"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./Header.module.scss"
import Button from "@/components/ui/Button/Button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            Ticket<span>Flow</span>
          </Link>
        </div>

        <button
          className={`${styles.mobileToggle} ${isMenuOpen ? styles.active : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`${styles.menuWrapper} ${isMenuOpen ? styles.open : ""}`}>
          <nav className={styles.nav}>
            <Link
              href="/tickets"
              onClick={() => setIsMenuOpen(false)}
              className={pathname === "/tickets" ? styles.active : ""}
            >
              Meus Tickets
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
