import styles from "../styles/page.module.scss"

export default function Home() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        Gerencie seus tickets com <span>eficiência.</span>
      </h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "var(--gap-lg)" }}>
        Uma plataforma robusta para controle de chamados e suporte.
      </p>

      <button className={styles.button}>Começar Agora</button>
    </main>
  )
}
