import { useMutation, useQueryClient } from "@tanstack/react-query"
import { TicketFormData } from "@/schemas/ticketSchema"

export const useCreateTicket = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: TicketFormData) => {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw errorData
      }

      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] })
    },
  })
}
