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

import styles from "./TicketCreateModal.module.scss"
import { useUpdateTicket } from "@/hooks/useUpdateTicket"

export default function TicketFormModal() {
  const { isModalOpen, setIsModalOpen, ticketToEdit, setTicketToEdit } = useTicketStore()
  const { mutate: createMutate, isPending: isCreating } = useCreateTicket()
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateTicket()
  const { addToast } = useToastStore()

  const isEditing = !!ticketToEdit
  const isPending = isCreating || isUpdating

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
  })

  useEffect(() => {
    if (isModalOpen) {
      if (ticketToEdit) {
        reset({
          title: ticketToEdit.title,
          email: ticketToEdit.email || "",
          category: ticketToEdit.category as any,
          priority: ticketToEdit.priority,
          status: ticketToEdit.status,
          description: ticketToEdit.description || "",
        })
      } else {
        reset({
          title: "",
          email: "",
          priority: "low",
          category: "other",
          status: "open",
          description: "",
        })
      }
    }
  }, [isModalOpen, ticketToEdit, reset])

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
    ]
    const focusableElements = modal.querySelectorAll<HTMLElement>(focusableSelectors.join(","))
    focusableElements[0]?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
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
    const mutation = isEditing ? updateMutate : createMutate
    const payload = isEditing ? { ...data, id: ticketToEdit.id } : data

    mutation(payload as any, {
      onSuccess: () => {
        addToast(
          isEditing ? "Ticket atualizado com sucesso!" : "Ticket criado com sucesso!",
          "success"
        )
        setIsModalOpen(false)
        setTicketToEdit(null)
        reset()
      },
      onError: (err: any) => {
        const message = err?.error || "Erro ao processar solicitação."
        addToast(message, "error")

        if (err?.errors) {
          Object.entries(err.errors).forEach(([key, value]) => {
            setError(key as keyof TicketFormData, {
              type: "server",
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
          <h2 id="ticket-modal-title">{isEditing ? "Editar Chamado" : "Novo Chamado"}</h2>
          <button type="button" className={styles.close} onClick={() => setIsModalOpen(false)}>
            &times;
          </button>
        </header>

        <main className={styles.form}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input autoFocus label="Título" error={errors.title?.message} {...register("title")} />

            <Input
              label="E-mail"
              type="email"
              error={errors.email?.message}
              {...register("email")}
            />

            <div className={styles.row}>
              <Select
                label="Categoria"
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
              error={errors.description?.message}
              {...register("description")}
            />

            <footer className={styles.actions}>
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" isLoading={isPending}>
                {isEditing ? "Salvar Alterações" : "Criar Ticket"}
              </Button>
            </footer>
          </form>
        </main>
      </section>
    </div>
  )
}
