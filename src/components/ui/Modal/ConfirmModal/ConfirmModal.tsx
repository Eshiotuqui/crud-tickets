"use client"

import Button from "@/components/ui/Button/Button"
import styles from "./ConfirmModal.module.scss"

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  description: string
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
}

export default function ConfirmModal({
  isOpen,
  title,
  description,
  onClose,
  onConfirm,
  isLoading,
}: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className={styles.actions}>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onConfirm} isLoading={isLoading}>
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  )
}
