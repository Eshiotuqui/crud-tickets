import Button from "@/components/ui/Button/Button"
import styles from "../styles/page.module.scss"

import Link from "next/link"

export default function Home() {
  return (
    <main className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Gerencie seus tickets com <span>eficiência.</span>
        </h1>
        <p className={styles.description}>
          Uma plataforma robusta para controle de chamados e suporte.
        </p>

        <Link href="/tickets" prefetch={true}>
          <Button variant="primary">Começar Agora</Button>
        </Link>
      </div>
    </main>
  )
}
