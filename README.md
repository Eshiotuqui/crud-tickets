# Sistema de Gestão de Tickets TicketFlow - Next.js

Este projeto implementa uma listagem, criação, edição e exclusão de tickets utilizando as mais modernas funcionalidades do **Next.js (App Router)**. A arquitetura foi desenhada para oferecer uma experiência de alta performance, equilibrando o processamento no servidor com a interatividade no cliente.

## Arquitetura de Renderização: SSR + Streaming

A página de listagem tickets não utiliza uma renderização estática simples, mas sim um fluxo híbrido de **Server-Side Rendering (SSR)** com **Streaming de Dados**.

### 1. Porquê o uso de SSR (Server-Side Rendering)?

A escolha de buscar os dados no servidor através do `TicketListServer` justifica-se por:

- **Redução de Latência (Proximidade de Dados):** A chamada à API é feita diretamente do servidor. Como o servidor da aplicação está geralmente na mesma rede ou região que a API/Banco de Dados, o tempo de resposta é drasticamente menor do que se partisse do navegador do utilizador (3G/4G/Wi-Fi).
- **Segurança e Abstração:** Lógicas sensíveis de fetch e possíveis tokens de autenticação ficam protegidos no ambiente do servidor, não sendo expostos ao browser.
- **Hidratação Eficiente:** Ao enviar o `initialData` pronto para o componente de cliente, o React "hidrata" a interface instantaneamente, sem que o utilizador tenha de esperar por um segundo carregamento após a página abrir.

### 2. O Papel do Streaming & Suspense

Utilizamos o componente `<Suspense>` com um `TicketSkeleton` para otimizar a **Performance Percebida**:

- **Feedback Imediato:** O utilizador recebe o layout da página (header, filtros e containers) no primeiro milissegundo.
- **Carregamento Progressivo:** Em vez de mostrar uma tela branca enquanto a API responde, o sistema exibe um estado de carregamento elegante. Assim que os dados chegam, o servidor faz o "stream" do conteúdo final para substituir o esqueleto.

### 3. Impacto no SEO (Search Engine Optimization)

Mesmo sendo uma área de gestão, a renderização no servidor é vital para o SEO:

- **Indexação de Conteúdo:** Ao contrário do CSR (Client-Side Rendering), onde o HTML chega vazio, com SSR o conteúdo dos tickets já está presente no código-fonte. Isso permite que motores de busca indexem a informação sem depender da execução de JavaScript.
- **Core Web Vitals:** Esta abordagem melhora o **LCP (Largest Contentful Paint)** e reduz o **CLS (Cumulative Layout Shift)**, métricas que o Google utiliza como fator de ranking para classificar a qualidade e velocidade do site.
- **Social Crawlers:** Links partilhados em redes sociais ou ferramentas de comunicação (Slack/WhatsApp) conseguem ler as meta-tags e o conteúdo para gerar previews (cards) ricos.

---

##  Divisão de Responsabilidades

| Componente         | Camada | Função                                                           |
| :----------------- | :----- | :--------------------------------------------------------------- |
| `TicketsPage`      | Server | Define a estrutura e o limite do Suspense.                       |
| `TicketListServer` | Server | Realiza o fetch de dados assíncrono (SSR).                       |
| `TicketList`       | Client | Gere estados de filtros, paginação e interações (modais/delete). |

---

##  Como funciona o Fluxo de Dados

1.  **Requisição:** O utilizador acede à rota de tickets.
2.  **Renderização Inicial:** O servidor envia o HTML com o Skeleton.
3.  **Data Fetching:** O `getTickets()` é executado no servidor.
4.  **Streaming:** O servidor envia os dados finais e o componente `TicketList` "acorda" no cliente.
5.  **Interação:** O utilizador filtra ou pagina os resultados localmente sem novas recargas de página, graças ao `useMemo` e ao estado local.

---
