import { NextResponse } from "next/server"
import { tickets } from "@/store/mockData"

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function GET() {
  await delay(1000)

  return NextResponse.json(tickets)
}

export async function POST(request: Request) {
  await delay(1000)
  const body = await request.json()

  const newTicket = {
    id: Date.now(),
    ...body,
  }

  tickets.push(newTicket)
  return NextResponse.json(newTicket, { status: 201 })
}
