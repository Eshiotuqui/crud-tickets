"use client"

import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ticketSchema, TicketFormData } from "@/schemas/ticketSchema"
import { useTicketStore } from "@/store/useTicketStore"
import { useCreateTicket } from "@/hooks/useCreateTicket"
import { useToastStore } from "@/store/useToastStore"

import Button from "@/components/ui/Button/Button"
import Input from "@/components/ui/Input/Input"
import Select from "@/components/ui/Select/Select"
import TextArea from "@/components/ui/Textarea/Textarea"

import styles from "./TicketModal.module.scss"

export default function TicketModal() {
  const { isModalOpen, setIsModalOpen } = useTicketStore()
  const { mutate, isPending } = useCreateTicket()
  const { addToast } = useToastStore()

  const modalRef = useRef<HTMLElement | null>(null)
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      priority: "low",
      category: "other",
      status: "open",
    },
  })

  useEffect(() => {
    if (!isModalOpen) return

    previouslyFocusedElement.current = document.activeElement as HTMLElement | null

    const modal = modalRef.current
    if (!modal) return

    const focusableSelectors = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ]

    const focusableElements = modal.querySelectorAll<HTMLElement>(focusableSelectors.join(","))

    focusableElements[0]?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        setIsModalOpen(false)
        return
      }

      if (event.key !== "Tab") return

      const first = focusableElements[0]
      const last = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      previouslyFocusedElement.current?.focus()
    }
  }, [isModalOpen, setIsModalOpen])

  if (!isModalOpen) return null

  const onSubmit = (data: TicketFormData) => {
    mutate(data, {
      onSuccess: () => {
        addToast("Ticket criado com sucesso!", "success")
        setIsModalOpen(false)
        reset()
      },
      onError: (err: any) => {
        addToast("Erro ao criar ticket.", "error")
        if (err?.errors) {
          Object.entries(err.errors).forEach(([key, value]) => {
            setError(key as keyof TicketFormData, {
              message: Array.isArray(value) ? value[0] : String(value),
            })
          })
        }
      },
    })
  }

  return (
    <div className={styles.overlay} role="presentation" onClick={() => setIsModalOpen(false)}>
      <section
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ticket-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          <h2 id="ticket-modal-title">Novo Chamado</h2>

          <button
            type="button"
            className={styles.close}
            aria-label="Fechar modal"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>
        </header>

        <main className={styles.form}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
              autoFocus
              label="Título"
              placeholder="Ex: [BUG] Erro no login"
              error={errors.title?.message}
              {...register("title")}
            />

            <Input
              label="E-mail"
              type="email"
              placeholder="seu@empresa.com"
              error={errors.email?.message}
              {...register("email")}
            />

            <div className={styles.row}>
              <Select
                label="Categoria"
                error={errors.category?.message}
                options={[
                  { value: "bug", label: "Bug" },
                  { value: "billing", label: "Financeiro" },
                  { value: "feature", label: "Funcionalidade" },
                  { value: "other", label: "Outros" },
                ]}
                {...register("category")}
              />

              <Select
                label="Prioridade"
                error={errors.priority?.message}
                options={[
                  { value: "low", label: "Baixa" },
                  { value: "medium", label: "Média" },
                  { value: "high", label: "Alta" },
                ]}
                {...register("priority")}
              />
            </div>

            <Select
              label="Status"
              error={errors.status?.message}
              options={[
                { value: "open", label: "Aberto" },
                { value: "in_progress", label: "Em Progresso" },
                { value: "resolved", label: "Resolvido" },
                { value: "closed", label: "Fechado" },
              ]}
              {...register("status")}
            />

            <TextArea
              label="Descrição"
              placeholder="Descreva o problema em detalhes..."
              error={errors.description?.message}
              {...register("description")}
            />

            <Input
              label="URL do Anexo (Opcional)"
              placeholder="https://..."
              error={errors.attachmentUrl?.message}
              {...register("attachmentUrl")}
            />

            <footer className={styles.actions}>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>

              <Button type="submit" variant="primary" isLoading={isPending}>
                Criar Ticket
              </Button>
            </footer>
          </form>
        </main>
      </section>
    </div>
  )
}
