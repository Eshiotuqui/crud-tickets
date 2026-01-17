import { Suspense } from "react"
import styles from "./TicketsPage.module.scss"

import Button from "@/components/ui/Button/Button"
import TicketSkeleton from "@/components/shared/TicketSkeleton/Skeleton"
import TicketFilters from "@/components/pages/TicketsList/TicketFilter/TicketsFilter"
import TicketList from "@/components/pages/TicketsList/TicketsList"

export default function TicketsPage() {
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
            <Button variant="primary">Abrir Novo Chamado</Button>
          </div>
        </section>

        <TicketFilters />

        <Suspense fallback={<TicketSkeleton length={3} />}>
          <TicketList />
        </Suspense>
      </div>
    </main>
  )
}
