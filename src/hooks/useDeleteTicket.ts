import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useToastStore } from "@/store/useToastStore"
import { apiPath } from "@/lib/api-config"

export const useDeleteTicket = () => {
  const queryClient = useQueryClient()
  const { addToast } = useToastStore()

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(apiPath(`/api/tickets/${id}`), {
        method: "DELETE",
      })
      if (!response.ok) throw new Error()
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] })
      addToast("Ticket removido!", "success")
    },
  })
}
