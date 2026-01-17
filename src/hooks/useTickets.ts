import { useSuspenseQuery } from "@tanstack/react-query"
import { Ticket, PaginatedResponse } from "@/types/ticket"

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""

  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL
  return "http://localhost:3000"
}

export const useTickets = (page: number = 1, limit: number = 6) => {
  return useSuspenseQuery<PaginatedResponse<Ticket>>({
    queryKey: ["tickets", page, limit],
    queryFn: async () => {
      const baseUrl = getBaseUrl()
      const response = await fetch(`${baseUrl}/api/tickets?page=${page}&limit=${limit}`)

      if (!response.ok) throw new Error("Erro ao carregar tickets")
      return response.json()
    },
  })
}
