"use client"

import styles from "./TicketSkeleton.module.scss"

interface TicketSkeletonProps {
  length?: number
}

export default function TicketSkeleton({ length = 3 }: TicketSkeletonProps) {
  return (
    <div className={styles.grid} role="status" aria-busy="true" aria-label="Carregando tickets...">
      {Array.from({ length }).map((_, i) => (
        <div key={i} className={styles.skeletonCard}>
          <header className={styles.header}>
            <div className={styles.shimmerBadge} />
            <div className={styles.shimmerBadge} />
          </header>

          <div className={styles.body}>
            <div className={styles.shimmerLine} />
            <div className={`${styles.shimmerLine} ${styles.short}`} />
          </div>

          <footer className={styles.footer}>
            <div className={styles.shimmerPill} />
            <div className={styles.shimmerDate} />
          </footer>
        </div>
      ))}
    </div>
  )
}
