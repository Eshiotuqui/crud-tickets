"use client"

import { useTicketStore } from "@/store/useTicketStore"
import { priorityTranslations, statusTranslations } from "@/lib/ticket-translate"
import styles from "./TicketViewModal.module.scss"
import Modal from ".."

export default function TicketViewModal() {
  const { ticketToView, setTicketToView } = useTicketStore()

  return (
    <Modal
      isOpen={!!ticketToView}
      onClose={() => setTicketToView(null)}
      title="Detalhes do Chamado"
    >
      {ticketToView && (
        <div className={styles.container}>
          <div className={styles.row}>
            <span className={styles.label}>Título</span>
            <p className={styles.value}>{ticketToView.title}</p>
          </div>

          <div className={styles.group}>
            <div className={styles.row}>
              <span className={styles.label}>Status</span>
              <span className={styles.statusBadge} data-status={ticketToView.status}>
                {statusTranslations[ticketToView.status]}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Prioridade</span>
              <span className={styles.priorityBadge} data-priority={ticketToView.priority}>
                {priorityTranslations[ticketToView.priority]}
              </span>
            </div>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Solicitante (E-mail)</span>
            <p className={styles.value}>{ticketToView.email}</p>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Descrição</span>
            <div className={styles.descriptionBox}>{ticketToView.description}</div>
          </div>
        </div>
      )}
    </Modal>
  )
}
