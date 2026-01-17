"use client"
import Button from "@/components/ui/Button/Button"
import { useTicketStore } from "@/store/useTicketStore"

export default function TicketHeaderActions() {
  const setIsModalOpen = useTicketStore((state) => state.setIsModalOpen)
  return (
    <Button variant="primary" onClick={() => setIsModalOpen(true)}>
      Abrir Novo Chamado
    </Button>
  )
}
