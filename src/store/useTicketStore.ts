import { create } from "zustand"

interface TicketUIState {
  filterStatus: string | null
  setFilterStatus: (status: string | null) => void
  selectedTicketId: number | null
  setSelectedTicketId: (id: number | null) => void
}

export const useTicketStore = create<TicketUIState>((set) => ({
  filterStatus: null,
  selectedTicketId: null,
  setFilterStatus: (status) => set({ filterStatus: status }),
  setSelectedTicketId: (id) => set({ selectedTicketId: id }),
}))
