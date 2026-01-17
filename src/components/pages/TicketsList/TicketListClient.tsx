"use client"

import { useState, useMemo, useEffect } from "react"
import { MoreVertical, Trash2 } from "lucide-react"
import { useTickets } from "@/hooks/useTickets"
import { useTicketStore } from "@/store/useTicketStore"
import { useDeleteTicket } from "@/hooks/useDeleteTicket"
import { Pagination } from "@/components/ui/Pagination/Pagination"
import { priorityTranslations, statusTranslations } from "@/lib/ticket-translate"
import { Ticket, PaginatedResponse } from "@/types/ticket"
import Popover from "@/components/ui/Popover/Popover"
import ConfirmModal from "@/components/ui/Modal/ConfirmModal/ConfirmModal"
import styles from "./TicketsList.module.scss"

interface TicketListProps {
  initialData: PaginatedResponse<Ticket>
}

export default function TicketList({ initialData }: TicketListProps) {
  const { data: response } = useTickets(initialData)
  const { searchQuery, filterStatus, sortBy } = useTicketStore()
  const { mutate: deleteTicket, isPending: isDeleting } = useDeleteTicket()

  const [currentPage, setCurrentPage] = useState(1)
  const [ticketToDelete, setTicketToDelete] = useState<Ticket | null>(null)
  const itemsPerPage = 6

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, filterStatus, sortBy])

  const filtered = useMemo(() => {
    const sourceData = response?.data || []
    let result = sourceData.filter((t: Ticket) => {
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
        return sortBy === "priority_high"
          ? (priorityMap[b.priority] || 0) - (priorityMap[a.priority] || 0)
          : (priorityMap[a.priority] || 0) - (priorityMap[b.priority] || 0)
      }
      return 0
    })
  }, [response, searchQuery, filterStatus, sortBy])

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginatedItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    if (currentPage > 1 && paginatedItems.length === 0 && filtered.length > 0) {
      setCurrentPage(totalPages)
    }
  }, [paginatedItems.length, filtered.length, currentPage, totalPages])

  if (filtered.length === 0) {
    return (
      <section className={styles.empty}>
        <p>Nenhum ticket encontrado.</p>
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
                  <Trash2 size={16} /> <span>Excluir</span>
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
        description={`Remover "${ticketToDelete?.title}"?`}
        onClose={() => setTicketToDelete(null)}
        onConfirm={() => {
          if (ticketToDelete) {
            deleteTicket(ticketToDelete.id, {
              onSuccess: () => setTicketToDelete(null),
            })
          }
        }}
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
