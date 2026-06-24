Flowa Order Manager — aplicação [Next.js](https://nextjs.org) para gerenciamento de ordens de ativos.

## Iniciando

> Este projeto usa **pnpm** como gerenciador de pacotes (fixado via campo `packageManager`). Habilite com `corepack enable` ou siga https://pnpm.io/installation. Usar npm/yarn ignora os `overrides` de segurança definidos em `pnpm-workspace.yaml`.

Instalação de dependências:

```bash
pnpm install
```

Iniciar o servidor de desenvolvimento:

```bash
pnpm dev
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
    - Um script chamado "precommit" (`pnpm precommit`) roda linting, formatação, testes e build. Rode-o manualmente antes de commitar: caso existam erros, faça os ajustes necessários e rode novamente. Se não houver erros, o CI vai rodar sem problemas no Github.

    ## Stack utilizada

    - Next.js
    - Zod (Validação)
    - ShadCn (UI Components)
    - TailwindCSS (CSS Framework)
    - Jest (Testing Framework)
    - Playwright (End-to-End Testing Framework)
    - Prettier (Formatting)
    - ESLint (Linting and Formatting)

## Convenções de dependências

- **Gerenciador de pacotes**: pnpm é obrigatório. `packageManager` fixa a versão exata para o corepack; `engines.pnpm` define o piso mínimo. `.npmrc` tem `engine-strict=true` para falhar instalações com a ferramenta/Node errados.
- **Node**: `.nvmrc` fixa a versão exata usada localmente e no CI (lida via `node-version-file`); `engines.node` é apenas o piso mínimo.
- **Pinning**: `next`, `eslint-config-next` e `prettier` são fixados em versão exata (sem `^`) para reprodutibilidade do toolchain e do `format:check`; as demais dependências usam faixas com `^`. `next` e `eslint-config-next` devem subir juntos. Ao subir o `next`, acrescente a nova versão exata em `minimumReleaseAgeExclude` no `pnpm-workspace.yaml`, senão a janela de quarentena (minimum-release-age) bloqueia a instalação.
