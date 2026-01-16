import { useSuspenseQuery } from "@tanstack/react-query"

export interface Ticket {
  id: number
  title: string
  status: "open" | "closed"
}

export const useTickets = () => {
  return useSuspenseQuery<Ticket[]>({
    queryKey: ["tickets"],
    queryFn: async () => {
      const response = await fetch("/api/tickets")
      if (!response.ok) throw new Error("Erro ao carregar os tickets")
      return response.json()
    },

    staleTime: 1000 * 60 * 5,
  })
}
