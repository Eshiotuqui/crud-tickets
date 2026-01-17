import { NextResponse } from "next/server"
import { tickets } from "@/store/mockData"

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await delay(500)

  try {
    const { id: idParam } = await params
    const id = Number(idParam)

    const ticketIndex = tickets.findIndex((t) => t.id === id)

    if (ticketIndex === -1) {
      return NextResponse.json({ error: `Ticket ${id} não encontrado` }, { status: 404 })
    }

    tickets.splice(ticketIndex, 1)

    return NextResponse.json({ message: "Ticket excluído com sucesso" })
  } catch (error) {
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 })
  }
}
