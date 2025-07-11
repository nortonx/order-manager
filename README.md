This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
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

    - The application has unit and integration tests.
    - Test coverage is above 80%
    - GitHub Actions pipelines were created to run tests and verify test coverage.
    - For DX (Developer Experience), static code analysis, linting, and code formatting scripts were created.
    - An NPM script called "precommit" was created to run linting and code formatting scripts before each commit. This script checks for linting and formatting errors. If there are errors, make the necessary adjustments and run it again. If there are no errors, the CI will run without issues on GitHub.

    ## Tech Stack

    - Next.js
    - Zod (Validação)
    - ShadCn (UI Components)
    - TailwindCSS (CSS Framework)
    - Jest (Testing Framework)
    - Playwright (End-to-End Testing Framework)
    - Prettier (Formatting)
    - ESLint (Linting and Formatting)
