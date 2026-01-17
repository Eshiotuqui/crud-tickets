"use client"

import { X } from "lucide-react"
import { useEffect } from "react"
import styles from "./modal.module.scss"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleEsc)
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleEsc)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h2>{title}</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={20} />
          </button>
        </header>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}
