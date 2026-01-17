export type TicketStatus = "open" | "in_progress" | "resolved" | "closed"
export type TicketPriority = "low" | "medium" | "high"
export type TicketCategory = "bug" | "billing" | "feature" | "other"

export interface Ticket {
  id: number
  title: string
  email?: string
  description?: string
  status: TicketStatus
  priority: TicketPriority
  category: TicketCategory
  createdAt: string
  updatedAt?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
}
