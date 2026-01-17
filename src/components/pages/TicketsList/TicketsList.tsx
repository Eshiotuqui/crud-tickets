"use client"

import { useState, useMemo, useEffect } from "react"
import { MoreVertical, Trash2 } from "lucide-react"
import { useTickets } from "@/hooks/useTickets"
import { useTicketStore } from "@/store/useTicketStore"
import { useDeleteTicket } from "@/hooks/useDeleteTicket"
import { Pagination } from "@/components/ui/Pagination/Pagination"
import { priorityTranslations, statusTranslations } from "@/lib/ticket-translate"
import { Ticket } from "@/types/ticket"
import Popover from "@/components/ui/Popover/Popover"
import ConfirmModal from "@/components/ui/Modal/ConfirmModal/ConfirmModal"
import styles from "./TicketsList.module.scss"

export default function TicketList() {
  const { data: response } = useTickets()
  const { searchQuery, filterStatus, sortBy } = useTicketStore()
  const { mutate: deleteTicket, isPending: isDeleting } = useDeleteTicket()

  const [currentPage, setCurrentPage] = useState(1)
  const [ticketToDelete, setTicketToDelete] = useState<Ticket | null>(null)
  const itemsPerPage = 6

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filterStatus, sortBy])

  const filtered = useMemo(() => {
    if (!response?.data) return []
    let result = response.data.filter((t: Ticket) => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = filterStatus === "all" || !filterStatus || t.status === filterStatus
      return matchesSearch && matchesStatus
    })

    return [...result].sort((a: Ticket, b: Ticket) => {
      if (sortBy === "newest")
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sortBy === "oldest")
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      if (sortBy.startsWith("priority")) {
        const priorityMap: Record<string, number> = { high: 3, medium: 2, low: 1 }
        const valA = priorityMap[a.priority] || 0
        const valB = priorityMap[b.priority] || 0
        return sortBy === "priority_high" ? valB - valA : valA - valB
      }
      return 0
    })
  }, [response?.data, searchQuery, filterStatus, sortBy])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage)

  useEffect(() => {
    if (currentPage > 1 && paginatedItems.length === 0 && filtered.length > 0) {
      setCurrentPage(totalPages)
    }
  }, [paginatedItems.length, filtered.length, currentPage, totalPages])

  if (filtered.length === 0) {
    return (
      <section className={styles.empty}>
        <p>Nenhum ticket encontrado para os filtros selecionados.</p>
      </section>
    )
  }

  return (
    <section className={styles.ticketsSection}>
      <div className={styles.grid}>
        {paginatedItems.map((ticket: Ticket) => (
          <article key={ticket.id} className={styles.card}>
            <header className={styles.cardHeader}>
              <div className={styles.headerLeft}>
                <span className={styles.categoryBadge}>{ticket.category || "Geral"}</span>
                <strong className={styles.priority} data-priority={ticket.priority}>
                  {priorityTranslations[ticket.priority]}
                </strong>
              </div>

              <Popover
                trigger={
                  <button className={styles.actionBtn}>
                    <MoreVertical size={20} />
                  </button>
                }
              >
                <button className={styles.deleteOption} onClick={() => setTicketToDelete(ticket)}>
                  <Trash2 size={16} color="var(--danger)" />
                  <span>Excluir</span>
                </button>
              </Popover>
            </header>

            <h3 className={styles.cardTitle}>{ticket.title}</h3>

            <footer className={styles.cardFooter}>
              <span className={styles.statusBadge} data-status={ticket.status}>
                {statusTranslations[ticket.status]}
              </span>
              <time className={styles.date}>
                {new Date(ticket.createdAt).toLocaleDateString("pt-BR")}
              </time>
            </footer>
          </article>
        ))}
      </div>

      <ConfirmModal
        isOpen={!!ticketToDelete}
        title="Excluir Chamado"
        description={`Tem certeza que deseja remover "${ticketToDelete?.title}"? Esta ação não pode ser desfeita.`}
        onClose={() => setTicketToDelete(null)}
        onConfirm={() =>
          deleteTicket(ticketToDelete!.id, {
            onSuccess: () => setTicketToDelete(null),
          })
        }
        isLoading={isDeleting}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  )
}
