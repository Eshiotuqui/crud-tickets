# Relatório de Uso de Inteligência Artificial

Este documento descreve como a inteligência artificial (Gemini) foi utilizada como ferramenta de suporte durante o desenvolvimento deste projeto.

## Áreas de Atuação da IA

### 1. Refatoração e Ajustes de SCSS

A IA foi consultada para otimizar a estrutura de layout do projeto, especificamente:

- **Grid System:** Auxílio na implementação de um layout responsivo de "mini cards" (3 por linha no desktop), utilizando frações (`1fr`) e garantindo a quebra correta para mobile.
- **Design Tokens:** Sugestões de implementação de variáveis CSS (CSS Variables) para manter a consistência visual de cores, espaçamentos e estados de _shimmer_ nos Skeletons.
- **Acessibilidade Visual:** Ajustes em propriedades de contraste e estados de hover/focus para melhorar a experiência do usuário.

### 2. Correção de Bugs e Tipagem (TypeScript)

O suporte da IA foi fundamental para resolver problemas comuns de inferência de tipos:

- **Fix de Implicit Any:** Resolução do erro de parâmetro implícito `any` em funções de mapeamento, garantindo que as interfaces de `Ticket` fossem respeitadas em todo o fluxo de dados.
- **Sincronização de Estado:** Auxílio na integração entre o estado global do **Zustand** e a lógica de ordenação/filtragem dentro do componente principal.

### 3. Insights de Performance

- **React Suspense:** Orientação sobre a transição do `useQuery` para `useSuspenseQuery` do TanStack Query, visando uma integração mais fluida com os Skeletons nativos do Next.js.
- **Imutabilidade:** Sugestão do uso de cópias de arrays (`spread operator`) antes de operações de ordenação (`.sort()`) para preservar a integridade do cache de dados.

## Ferramentas Utilizadas

- **Modelo:** Gemini 2.0 Flash (Google)
- **Finalidade:** Pair Programming e Code Review.

---

_Nota: Todas as sugestões fornecidas pela IA foram revisadas, testadas e adaptadas manualmente para garantir que atendessem aos requisitos específicos da prova e às regras de negócio do sistema de tickets._
