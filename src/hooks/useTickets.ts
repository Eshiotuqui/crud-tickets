import { useSuspenseQuery } from "@tanstack/react-query"
import { Ticket, PaginatedResponse } from "@/types/ticket"

export const useTickets = (page: number = 1, limit: number = 6) => {
  return useSuspenseQuery<PaginatedResponse<Ticket>>({
    queryKey: ["tickets", page, limit],
    queryFn: async () => {
      const response = await fetch(`/api/tickets?page=${page}&limit=${limit}`)
      if (!response.ok) throw new Error("Erro ao carregar tickets")
      return response.json()
    },
  })
}
