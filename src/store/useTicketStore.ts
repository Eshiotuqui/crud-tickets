import { create } from "zustand"

interface TicketUIState {
  filterStatus: string
  searchQuery: string
  sortBy: string
  isModalOpen: boolean
  setFilterStatus: (status: string) => void
  setSearchQuery: (query: string) => void
  setSortBy: (sort: string) => void
  setIsModalOpen: (open: boolean) => void
}

export const useTicketStore = create<TicketUIState>((set) => ({
  filterStatus: "all",
  searchQuery: "",
  sortBy: "newest",
  isModalOpen: false,
  setFilterStatus: (status) => set({ filterStatus: status }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setIsModalOpen: (open) => set({ isModalOpen: open }),
}))
