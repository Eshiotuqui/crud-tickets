import { NextResponse } from "next/server"
import { tickets } from "@/store/mockData"
import { ticketSchema } from "@/schemas/ticketSchema"
import type { Ticket } from "@/types/ticket"

export const dynamic = "force-dynamic"

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
  await delay(1000)

  try {
    const body = await request.json()
    const validation = ticketSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.flatten().fieldErrors }, { status: 400 })
    }

    if (validation.data.category === "billing") {
      const isPublicDomain = /@(gmail|hotmail|outlook|yahoo|live)\./i.test(validation.data.email)
      if (isPublicDomain) {
        return NextResponse.json(
          {
            errors: {
              email: ["E-mails públicos não são permitidos para financeiro."],
            },
          },
          { status: 400 }
        )
      }
    }

    const newTicket: Ticket = {
      ...validation.data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    }

    tickets.unshift(newTicket)

    return NextResponse.json(newTicket, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Falha ao processar requisição" }, { status: 500 })
  }
}
