import TicketList from "./TicketListClient"

async function getTickets() {
  const baseUrl = process.env.API_URL || "http://localhost:3000"

  const res = await fetch(`${baseUrl}/api/tickets`, {
    cache: "no-store",
  })

  if (!res.ok) {
    return { data: [], meta: { totalItems: 0 } }
  }

  return res.json()
}

export default async function TicketListServer() {
  const initialData = await getTickets()
  return <TicketList initialData={initialData} />
}
