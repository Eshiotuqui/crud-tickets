"use client"

import { useTicketStore } from "@/store/useTicketStore"
import styles from "./TicketsFilter.module.scss"
import Input from "@/components/ui/Input/Input"
import Select from "@/components/ui/Select/Select"

export default function TicketFilters() {
  const { searchQuery, setSearchQuery, filterStatus, setFilterStatus, sortBy, setSortBy } =
    useTicketStore()

  const statusOptions = [
    { value: "all", label: "Todos os Status" },
    { value: "open", label: "Aberto" },
    { value: "in_progress", label: "Em Progresso" },
    { value: "resolved", label: "Resolvido" },
  ]

  const sortOptions = [
    { value: "newest", label: "Mais Recentes" },
    { value: "oldest", label: "Mais Antigos" },
    { value: "priority_high", label: "Maior Prioridade" },
    { value: "priority_low", label: "Menor Prioridade" },
  ]

  return (
    <section className={styles.filterBar} aria-label="Filtros de busca">
      <form className={styles.filterForm} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.searchGroup}>
          <label htmlFor="search-input" className="sr-only">
            Buscar tickets
          </label>
          <Input
            id="search-input"
            type="search"
            placeholder="Buscar pelo título..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.selectGroup}>
          <label htmlFor="status-filter" className="sr-only">
            Filtrar por status
          </label>
          <Select
            id="status-filter"
            options={statusOptions}
            value={filterStatus || "all"}
            onChange={(e) => setFilterStatus(e.target.value)}
          />
        </div>

        <div className={styles.selectGroup}>
          <label htmlFor="sort-filter" className="sr-only">
            Ordenar por
          </label>
          <Select
            id="sort-filter"
            options={sortOptions}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          />
        </div>
      </form>
    </section>
  )
}
