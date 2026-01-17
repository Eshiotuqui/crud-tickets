import { NextResponse } from "next/server"
import { tickets } from "@/store/mockData"

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function GET(request: Request) {
  await delay(800)

  try {
    const { searchParams } = new URL(request.url)
    const page = Number(searchParams.get("page")) || 1
    const limit = Number(searchParams.get("limit")) || 6

    const totalItems = tickets.length
    const totalPages = Math.ceil(totalItems / limit)

    return NextResponse.json({
      data: tickets,
      meta: {
        totalItems,
        itemCount: tickets.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()

  const newTicket = {
    id: Date.now(),
    status: "open",
    createdAt: new Date().toISOString(),
    ...body,
  }

  tickets.unshift(newTicket)
  return NextResponse.json(newTicket, { status: 201 })
}
