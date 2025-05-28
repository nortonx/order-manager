This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Iniciando

Instalação de dependências:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Iniciar o servidor de desenvolvimento:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra o link [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

Instruções:

- A aplicação possui 3 links principais:

  - **Home**: A página inicial da aplicação.
  - **Ativos**: Uma página que mostra lista de ativos, obtida de dados locais (mocked).
  - **Gerenciador de Ordens**: Uma página que contém o data-grid vazio e um formulário para busca de ativos.

    - O formulário permite buscar ativos por nome (Instrumento/Ticker).
    - Ao digitar o nome de um dos ativos da lista exibida na página de Ativos, o formulário lista os ativos que correspondem à string digitada no campo.
    - A partir da listagem, o nome do ativo é exibido em um botão, que o usuário pode clicar para selecionar o mesmo.
    - No formulário, o usuário pode alterar o valor do campo "Quantidade" para definir a quantidade de ativos que deseja comprar.
    - Após clicar no botão adicionar, o ativo é adicionado ao data-grid. Ao lado do indicador de "Status", o usuário verá um botão de cancelamento, que ao ser clicado remove o ativo do data-grid com um modal de confirmação.
    - Caso o ativo não seja cancelado, após 8 segundos, o status do ativo é alterado para "Fechado" e o botão de cancelamento é removido.

    ## Testes

    - A aplicação possui testes unitários e de integração.
    - A cobertura de testes está acima de 80%
    - Foram criados Pipelines no GitHub Actions para rodar os testes e verificar a cobertura de testes.
    - Foram criados, para o DX (Developer Experience), scripts de análise estática de código, linting e formatação de código.
    - Um script NPM chamado "precommit" foi criado para rodar os scripts de linting e formatação de código antes de cada commit. Esse script verifica se há erros de linting e formatação. Caso existam erros, faça os ajustes necessários e o rode novamente. Se não houver erros, o CI vai rodar sem problemas no Github.

    ## Stack utilizada
    - Next.js
    - Zod (Validação)
    - ShadCn (UI Components)
    - TailwindCSS (CSS Framework)
    - Jest (Testing Framework)
    - Playwright (End-to-End Testing Framework)
    - Prettier (Formatting)
    - ESLint (Linting and Formatting)
