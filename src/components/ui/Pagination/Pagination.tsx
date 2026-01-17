import styles from "./Pagination.module.scss"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Anterior
      </button>

      <span>
        Página {currentPage} de {totalPages}
      </span>

      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Próxima
      </button>
    </div>
  )
}
