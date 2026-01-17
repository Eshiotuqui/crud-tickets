import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToastStore } from "@/store/useToastStore"

export const useDeleteTicket = () => {
  const queryClient = useQueryClient()
  const { addToast } = useToastStore()

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/tickets/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error()
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] })
      addToast("Ticket removido!", "success")
    },
  })
}
