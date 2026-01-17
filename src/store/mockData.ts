import { Ticket } from "@/types/ticket"

export const tickets: Ticket[] = [
  {
    id: 1,
    title: "Erro na tela de login",
    email: "joao.silva@empresa.com",
    description:
      "Usuários relatam que o botão de 'Entrar' não responde após preencher os campos de e-mail e senha em dispositivos móveis.",
    status: "open",
    priority: "high",
    category: "bug",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Configurar SCSS",
    email: "admin@dev.com",
    description:
      "Implementar a estrutura de variáveis globais, mixins de responsividade e reset padrão utilizando SASS/SCSS no projeto.",
    status: "closed",
    priority: "low",
    category: "feature",
    createdAt: "2024-01-16T14:30:00Z",
  },
  {
    id: 3,
    title: "Dúvida na fatura",
    email: "financeiro@cliente.com",
    description:
      "Cliente questiona o valor cobrado referente ao mês de Dezembro, alegando que houve uma cobrança duplicada da taxa de serviço.",
    status: "open",
    priority: "medium",
    category: "billing",
    createdAt: "2024-01-16T15:00:00Z",
  },
  {
    id: 4,
    title: "Erro ao exportar PDF",
    email: "contato@empresa.com",
    description:
      "Ao clicar em 'Exportar Relatório', o arquivo PDF gerado corrompe as tabelas e não exibe as imagens anexadas.",
    status: "in_progress",
    priority: "high",
    category: "bug",
    createdAt: "2024-01-17T09:00:00Z",
  },
  {
    id: 5,
    title: "Melhoria na Dashboard",
    email: "design@agencia.com",
    description:
      "Adicionar gráficos de linha para representar a evolução mensal de chamados resolvidos vs. chamados abertos.",
    status: "open",
    priority: "low",
    category: "feature",
    createdAt: "2024-01-18T11:20:00Z",
  },
  {
    id: 6,
    title: "Problema de conexão API",
    email: "devops@infra.com",
    description:
      "O endpoint de autenticação está retornando erro 500 intermitente durante horários de pico (entre 14h e 16h).",
    status: "open",
    priority: "high",
    category: "other",
    createdAt: "2024-01-19T13:45:00Z",
  },
  {
    id: 7,
    title: "Atualizar termos de uso",
    email: "juridico@legal.com",
    description:
      "Revisão jurídica necessária nos termos de privacidade conforme a nova atualização da LGPD.",
    status: "resolved",
    priority: "medium",
    category: "other",
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: 8,
    title: "Botão de salvar não funciona",
    email: "usuario.teste@gmail.com",
    description:
      "No formulário de edição de perfil, o botão 'Salvar Alterações' fica desabilitado mesmo após todos os campos obrigatórios serem preenchidos.",
    status: "open",
    priority: "high",
    category: "bug",
    createdAt: "2024-01-21T08:30:00Z",
  },
]
