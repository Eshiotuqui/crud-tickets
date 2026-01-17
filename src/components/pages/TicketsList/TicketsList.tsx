"use client"

import { useState, useMemo, useEffect } from "react"
import { useTickets } from "@/hooks/useTickets"
import { useTicketStore } from "@/store/useTicketStore"
import { Pagination } from "@/components/ui/Pagination/Pagination"
import { priorityTranslations, statusTranslations } from "@/lib/ticket-translate"
import { Ticket } from "@/types/ticket"
import styles from "./TicketsList.module.scss"

export default function TicketList() {
  const { data: response } = useTickets()
  const { searchQuery, filterStatus, sortBy } = useTicketStore()

  const [currentPage, setCurrentPage] = useState(1)
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
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      }

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

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (filtered.length === 0) {
    return (
      <section className={styles.empty} aria-live="polite">
        <p>Nenhum ticket encontrado para os filtros selecionados.</p>
      </section>
    )
  }

  return (
    <section className={styles.ticketsSection} aria-label="Listagem de tickets">
      <div className={styles.grid}>
        {paginatedItems.map((ticket: Ticket) => (
          <article key={ticket.id} className={styles.card}>
            <header className={styles.cardHeader}>
              <span className={styles.categoryBadge}>{ticket.category || "Geral"}</span>
              <strong
                className={styles.priority}
                data-priority={ticket.priority}
                aria-label={`Prioridade: ${priorityTranslations[ticket.priority]}`}
              >
                {priorityTranslations[ticket.priority] || ticket.priority}
              </strong>
            </header>

            <h3 className={styles.cardTitle}>{ticket.title}</h3>

            <footer className={styles.cardFooter}>
              <span className={styles.statusBadge} data-status={ticket.status}>
                {statusTranslations[ticket.status] || ticket.status}
              </span>
              <time dateTime={ticket.createdAt} className={styles.date}>
                {new Date(ticket.createdAt).toLocaleDateString("pt-BR")}
              </time>
            </footer>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <nav aria-label="Navegação da paginação" className={styles.paginationNav}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </nav>
      )}
    </section>
  )
}
