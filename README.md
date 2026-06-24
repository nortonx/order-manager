Flowa Order Manager — aplicação [Next.js](https://nextjs.org) para gerenciamento de ordens de ativos.

## Getting Started

> Este projeto usa **pnpm** como gerenciador de pacotes (fixado via campo `packageManager`). Habilite com `corepack enable` ou siga https://pnpm.io/installation. Usar npm/yarn ignora os `overrides` de segurança definidos em `pnpm-workspace.yaml`.

Instalação de dependências:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

Instructions:

- The application has 3 main links:

  - **Home**: The application's home page.
  - **Assets**: A page that shows a list of assets, obtained from local data (mocked).
  - **Order Manager**: A page that contains an empty data grid and a form for searching assets.

    - The form allows searching for assets by name (Instrument/Ticker).
    - When typing the name of one of the assets from the list displayed on the Assets page, the form lists the assets that match the string typed in the field.
    - From the listing, the asset name is displayed on a button that the user can click to select it.
    - In the form, the user can change the value of the "Quantity" field to define the quantity of assets they want to buy.
    - After clicking the add button, the asset is added to the data grid. Next to the "Status" indicator, the user will see a cancel button, which when clicked removes the asset from the data grid with a confirmation modal.
    - If the asset is not canceled, after 8 seconds, the asset status changes to "Closed" and the cancel button is removed.

    ## Testing

    - A aplicação possui testes unitários e de integração.
    - A cobertura de testes está acima de 80%
    - Foram criados Pipelines no GitHub Actions para rodar os testes e verificar a cobertura de testes.
    - Foram criados, para o DX (Developer Experience), scripts de análise estática de código, linting e formatação de código.
    - Um script chamado "precommit" (`pnpm precommit`) roda linting, formatação, testes e build. Rode-o manualmente antes de commitar: caso existam erros, faça os ajustes necessários e rode novamente. Se não houver erros, o CI vai rodar sem problemas no Github.

    ## Tech Stack

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
