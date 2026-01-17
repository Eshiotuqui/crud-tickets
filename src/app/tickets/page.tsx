"use client"

import { Suspense } from "react"
import { useTicketStore } from "@/store/useTicketStore"
import styles from "./TicketsPage.module.scss"

import Button from "@/components/ui/Button/Button"
import TicketSkeleton from "@/components/shared/TicketSkeleton/Skeleton"
import TicketFilters from "@/components/pages/TicketsList/TicketFilter/TicketsFilter"
import TicketList from "@/components/pages/TicketsList/TicketsList"

import TicketCreateModal from "@/components/ui/Modal/TicketCreateModal/TicketCreateModal"

export default function TicketsPage() {
  const setIsModalOpen = useTicketStore((state) => state.setIsModalOpen)

  return (
    <main className={styles.wrapper}>
      <div className="container">
        <section className={styles.header} aria-labelledby="page-title">
          <div className={styles.titleGroup}>
            <h1 id="page-title">
              Meus <span>Tickets</span>
            </h1>
            <p>Acompanhe o progresso dos seus chamados.</p>
          </div>

          <div className={styles.actions}>
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Abrir Novo Chamado
            </Button>
          </div>
        </section>

        <TicketFilters />

        <Suspense fallback={<TicketSkeleton length={3} />}>
          <TicketList />
        </Suspense>
      </div>

      <TicketCreateModal />
    </main>
  )
}
