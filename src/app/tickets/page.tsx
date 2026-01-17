import { Suspense } from "react"
import styles from "./TicketsPage.module.scss"
import TicketSkeleton from "@/components/shared/TicketSkeleton/Skeleton"
import TicketFilters from "@/components/pages/TicketsList/TicketFilter/TicketsFilter"
import TicketListServer from "@/components/pages/TicketsList/TicketListServer"
import TicketHeaderActions from "@/components/pages/TicketsList/TicketHeader/TicketHeader"
import TicketModals from "@/components/shared/TicketModals/TicketModals"

export default function TicketsPage() {
  return (
    <main className={styles.wrapper}>
      <div className="container">
        <section className={styles.header}>
          <div className={styles.titleGroup}>
            <h1>
              Meus <span>Tickets</span>
            </h1>
            <p>Acompanhe o progresso dos seus chamados.</p>
          </div>
          <div className={styles.actions}>
            <TicketHeaderActions />
          </div>
        </section>

        <TicketFilters />

        <Suspense fallback={<TicketSkeleton length={6} />}>
          <TicketListServer />
        </Suspense>
      </div>

      <TicketModals />
    </main>
  )
}
