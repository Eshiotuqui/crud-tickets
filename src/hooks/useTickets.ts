import { useQuery } from "@tanstack/react-query"
import { Ticket, PaginatedResponse } from "@/types/ticket"
import { apiPath } from "@/lib/api-config"

export const useTickets = (initialData?: PaginatedResponse<Ticket>) => {
  return useQuery<PaginatedResponse<Ticket>>({
    queryKey: ["tickets"],
    queryFn: async () => {
      const response = await fetch(apiPath("/api/tickets"))
      if (!response.ok) throw new Error("Erro ao carregar tickets")
      return response.json()
    },
    initialData,
    refetchOnMount: true,
    staleTime: 0,
  })
}
