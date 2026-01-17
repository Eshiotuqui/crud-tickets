#  TicketFlow - Sistema de Gestão de Chamados

O **TicketFlow** é uma solução moderna para centralização e controle de tickets de suporte. O projeto nasceu da necessidade de um fluxo de trabalho ágil, onde a triagem de problemas (Bugs, Financeiro, Funcionalidades) precisa ser feita de forma intuitiva e performática. 

Este sistema consiste em um **CRUD completo** (Create, Read, Update, Delete) que simula o dia a dia de uma equipe de suporte, permitindo desde a abertura de um chamado, edição de prioridades, até a visualização detalhada e o encerramento definitivo através de uma interface limpa e responsiva.

## Arquitetura e Estrutura de Pastas

O projeto segue uma organização modular baseada em responsabilidades, garantindo separação clara entre lógica de servidor e cliente:

```text
src/
├── app/            # Rotas, layouts e Server Components (Next.js App Router)
├── assets/         # Recursos estáticos (imagens, ícones locais)
├── components/     # Componentes React divididos por escopo:
│   ├── pages/      # Componentes de estrutura de páginas específicas
│   ├── providers/  # Provedores de contexto (QueryClient, Auth, etc)
│   ├── shared/     # Componentes de negócio reutilizáveis
│   └── ui/         # Componentes de interface base (design system)
├── hooks/          # Hooks customizados para lógica compartilhada
├── lib/            # Configurações de libs e utilitários (API, tradução)
├── schemas/        # Validações de dados com Zod (ex: ticketSchema.ts)
├── store/          # Gerenciamento de estado global com Zustand
├── styles/         # Estilização global e mixins SASS
└── types/          # Definições de interfaces TypeScript
```

---

##  Funcionalidades Principais

* **Gestão de Ciclo de Vida:** Criação, edição, visualização e exclusão de tickets.
* **Filtros Inteligentes:** Busca textual e filtragem por status em tempo real.
* **Ordenação Dinâmica:** Organização por data (mais recentes/antigos) e níveis de prioridade.
* **Interface Consistente:** Sistema de modais padronizado e centralizado para uma experiência fluida.
* **Performance Percebida:** Uso de esqueletos de carregamento (Skeletons) para evitar telas brancas.

---

## 🛠 Tecnologias Utilizadas

O projeto utiliza as ferramentas mais robustas do ecossistema JavaScript atual:

* **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Gerenciamento de Estado:** [Zustand](https://zustand-demo.pmnd.rs/) (Estado global leve e escalável)
* **Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest) (Cache e sincronização de dados)
* **Estilização:** [SASS (CSS Modules)](https://sass-lang.com/)
* **Validação:** [Zod](https://zod.dev/) + React Hook Form
* **Ícones:** [Lucide React](https://lucide.dev/)

---

##  Primeiros Passos

### Pré-requisitos

Para rodar este projeto localmente, você precisará:
* **Node.js:** Versão **20.x** ou superior (LTS recomendada).
* **Gerenciador de pacotes:** NPM (incluso no Node).

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/ticketflow.git](https://github.com/seu-usuario/ticketflow.git)
    cd ticketflow
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env.local` na raiz do projeto e adicione a URL da sua API:
    ```env
    NEXT_PUBLIC_API_URL=[http://localhost:3000](http://localhost:3000)
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    Acesse `http://localhost:3000` no seu navegador.

---

## Arquitetura de Renderização: SSR + Streaming

A página de listagem de tickets utiliza um fluxo híbrido de **Server-Side Rendering (SSR)** com **Streaming de Dados**, aproveitando o poder do Next.js App Router.



### 1. Por que o uso de SSR (Server-Side Rendering)?

A escolha de buscar os dados no servidor através do `TicketListServer` justifica-se por:

* **Redução de Latência:** A chamada à API é feita diretamente do servidor. Como o servidor da aplicação está geralmente na mesma rede ou região que a API, o tempo de resposta é menor que via browser.
* **Segurança:** Lógicas de fetch e tokens de autenticação ficam protegidos no ambiente do servidor, sem exposição ao cliente.
* **Hidratação Eficiente:** O utilizador recebe o `initialData` pronto para o componente de cliente, permitindo que o React "hidrate" a interface instantaneamente.

### 2. O Papel do Streaming & Suspense

Utilizamos o componente `<Suspense>` com um `TicketSkeleton` para otimizar a experiência do usuário:

* **Feedback Imediato:** O utilizador recebe o layout da página (header, filtros) no primeiro milissegundo.
* **Carregamento Progressivo:** O servidor faz o "stream" do conteúdo final assim que os dados chegam, substituindo o esqueleto de forma suave e automática.

### 3. Impacto no SEO

* **Indexação de Conteúdo:** O conteúdo dos tickets já está presente no código-fonte enviado pelo servidor, garantindo que motores de busca indexem a informação sem depender da execução de JavaScript.
* **Core Web Vitals:** Melhora significativamente o **LCP** (Largest Contentful Paint) e reduz o **CLS** (Cumulative Layout Shift).

---

##  Divisão de Responsabilidades

| Componente | Camada | Função |
| :--- | :--- | :--- |
| `TicketsPage` | Server | Define a estrutura da página e o limite do Suspense. |
| `TicketListServer` | Server | Realiza o fetch de dados assíncrono (SSR). |
| `TicketList` | Client | Gere estados de filtros, paginação e interações de cards. |
| `TicketModals` | Client | Centraliza os modais globais (Create, Edit, View) via Zustand. |

---

##  Como funciona o Fluxo de Dados

1.  **Requisição:** O utilizador acessa a rota de tickets.
2.  **Renderização Inicial:** O servidor envia o HTML base com o Skeleton.
3.  **Data Fetching:** O `getTickets()` é executado no servidor (Server Component).
4.  **Streaming:** O servidor envia os dados finais e o componente `TicketList` "acorda" no cliente.
5.  **Interação:** O utilizador filtra ou pagina os resultados localmente via `useMemo`, sem necessidade de novas recargas de página.

---

###  Melhorias Futuras

Com mais tempo de desenvolvimento, os seguintes tópicos seriam priorizados:

Testes Automatizados: Cobertura de testes unitários nos Hooks e testes E2E (Cypress) no fluxo de CRUD.

Internacionalização (i18n): Suporte completo a múltiplos idiomas através da estrutura em lib/ticket-translate.ts.

Modo Escuro (Dark Mode): Implementar suporte a temas utilizando variáveis SASS ou Tailwind, respeitando a preferência do sistema do usuário.

Drag and Drop (Kanban): Adicionar uma visualização de quadro (Kanban) onde o status do ticket possa ser alterado arrastando o card, utilizando bibliotecas como dnd-kit.

## vídeo de demonstração



https://github.com/user-attachments/assets/4bbf8f70-2a04-40d0-ba3a-2552c195473e



Desenvolvido por [Enzo Shiotuqui].
