import { ReactNode } from "react"
import styles from "./Card.module.scss"

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div className={`${styles.card} ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

export function CardHeader({ children }: { children: ReactNode }) {
  return <div className={styles.header}>{children}</div>
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className={styles.content}>{children}</div>
}

export function CardFooter({ children }: { children: ReactNode }) {
  return <div className={styles.footer}>{children}</div>
}
