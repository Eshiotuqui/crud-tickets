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

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params
  const id = Number(idParam)
  const ticket = tickets.find((t) => t.id === id)

  if (!ticket) {
    return NextResponse.json({ error: "Ticket não encontrado" }, { status: 404 })
  }

  return NextResponse.json(ticket)
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await delay(500)
  try {
    const { id: idParam } = await params
    const id = Number(idParam)
    const body = await request.json()

    const index = tickets.findIndex((t) => t.id === id)

    if (index === -1) {
      return NextResponse.json({ error: "Ticket não encontrado" }, { status: 404 })
    }

    const updatedTicket = {
      ...tickets[index],
      title: body.title ?? tickets[index].title,
      email: body.email ?? tickets[index].email,
      status: body.status ?? tickets[index].status,
      priority: body.priority ?? tickets[index].priority,
      category: body.category ?? tickets[index].category,
      description: body.description ?? tickets[index].description,
      updatedAt: new Date().toISOString(),
    }

    tickets[index] = updatedTicket

    return NextResponse.json(updatedTicket)
  } catch (error) {
    return NextResponse.json({ error: "Falha ao atualizar" }, { status: 500 })
  }
}
