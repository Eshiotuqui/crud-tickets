import { z } from "zod"

const commonDomains = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "icloud.com"]

export const ticketSchema = z
  .object({
    title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
    description: z.string().min(20, "A descrição deve ter pelo menos 20 caracteres"),
    email: z.string().email("E-mail inválido"),
    priority: z.enum(["low", "medium", "high"]),
    category: z.enum(["bug", "billing", "feature", "other"]),
    status: z.enum(["open", "in_progress", "resolved", "closed"]),
    attachmentUrl: z.string().url("URL de anexo inválida").optional().or(z.literal("")),
  })

  .refine(
    (data) => {
      if (data.category === "bug") {
        return data.title.toUpperCase().includes("[BUG]")
      }
      return true
    },
    {
      message: "Para a categoria 'Bug', o título deve conter [BUG]",
      path: ["title"],
    }
  )

  .refine(
    (data) => {
      if (data.category === "billing") {
        const domain = data.email.split("@")[1]?.toLowerCase()
        return !commonDomains.includes(domain)
      }
      return true
    },
    {
      message:
        "Chamados de faturamento exigem um e-mail corporativo (não use Gmail, Hotmail, etc.)",
      path: ["email"],
    }
  )

  .refine(
    (data) => {
      if (data.priority === "high") {
        return data.description.length >= 60
      }
      return true
    },
    {
      message: "Chamados de alta prioridade exigem uma descrição detalhada (mínimo 60 caracteres)",
      path: ["description"],
    }
  )

export type TicketFormData = z.infer<typeof ticketSchema>
