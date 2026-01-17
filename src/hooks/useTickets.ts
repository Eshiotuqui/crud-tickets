import { useQuery } from "@tanstack/react-query"
import { Ticket, PaginatedResponse } from "@/types/ticket"

export const useTickets = (initialData?: PaginatedResponse<Ticket>) => {
  return useQuery<PaginatedResponse<Ticket>>({
    queryKey: ["tickets"],
    queryFn: async () => {
      const response = await fetch("/api/tickets")
      if (!response.ok) throw new Error("Erro ao carregar tickets")
      return response.json()
    },
    initialData,
    staleTime: 1000 * 60,
  })
}
