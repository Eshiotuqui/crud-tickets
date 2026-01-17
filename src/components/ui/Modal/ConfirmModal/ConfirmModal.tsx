"use client"

import Button from "@/components/ui/Button/Button"
import Modal from ".."
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
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className={styles.container}>
        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onConfirm} isLoading={isLoading}>
            Confirmar Exclusão
          </Button>
        </div>
      </div>
    </Modal>
  )
}
