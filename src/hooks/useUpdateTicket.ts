import type { Ticket } from "@/types/ticket"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateTicket = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<Ticket> & { id: number }) => {
      const response = await fetch(`/api/tickets/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw await response.json()
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] })
    },
  })
}
