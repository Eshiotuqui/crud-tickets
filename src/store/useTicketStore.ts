import { create } from "zustand"
import { Ticket } from "@/types/ticket"

interface TicketUIState {
  filterStatus: string
  searchQuery: string
  sortBy: string
  isModalOpen: boolean
  ticketToEdit: Ticket | null
  ticketToView: Ticket | null
  setFilterStatus: (status: string) => void
  setSearchQuery: (query: string) => void
  setSortBy: (sort: string) => void
  setIsModalOpen: (open: boolean) => void
  setTicketToEdit: (ticket: Ticket | null) => void
  setTicketToView: (ticket: Ticket | null) => void
}

export const useTicketStore = create<TicketUIState>((set) => ({
  filterStatus: "all",
  searchQuery: "",
  sortBy: "newest",
  isModalOpen: false,
  ticketToEdit: null,
  ticketToView: null,
  setFilterStatus: (status) => set({ filterStatus: status }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setIsModalOpen: (open) =>
    set((state) => ({
      isModalOpen: open,
      ticketToEdit: open ? state.ticketToEdit : null,
    })),
  setTicketToEdit: (ticket) => set({ ticketToEdit: ticket, isModalOpen: !!ticket }),
  setTicketToView: (ticket) => set({ ticketToView: ticket }),
}))
