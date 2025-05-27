import { test, expect } from "@playwright/test";

test.describe("Asset Manager Page", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to home page and then to manager
    await test.step("navigate to manager page", async () => {
      await page.goto("http://localhost:3000");
      await page.getByRole("link", { name: "Order Manager" }).click();
      await expect(page.getByTestId("manager-page")).toBeVisible();
    });
  });

  test("should successfully submit PETR4 asset order", async ({ page }) => {
    await test.step("fill and submit asset form", async () => {
      // Fill asset symbol
      const symbolInput = page.getByPlaceholder("Instrumento");
      await symbolInput.waitFor({ state: "visible" });
      await symbolInput.fill("PETR4");

      // Wait for and verify search results
      const searchResults = page.getByTestId("asset-search");
      await expect(searchResults).toBeVisible();

      // Select asset from results
      const assetButton = page.getByRole("button", { name: "PETR4" });
      await assetButton.waitFor();
      await assetButton.click();

      // Select order type
      await page.getByRole("combobox").click();
      await page.getByRole("option", { name: "Compra" }).click();

      // Set quantity
      const quantityInput = page.getByPlaceholder("Quantidade");
      await quantityInput.waitFor();
      await quantityInput.fill("100");

      // Verify order summary
      await expect(page.getByTestId("order-summary")).toBeVisible();

      // Submit order
      const addButton = page.getByRole("button", { name: "Adicionar" });
      await expect(addButton).toBeEnabled();
      await addButton.click();
    });

    await test.step("verify order in table", async () => {
      // Check order details in table
      const ordersTable = page.getByTestId("orders-table");
      await expect(ordersTable).toBeVisible();

      // Verify all order details are displayed correctly
      await expect(page.getByRole("cell", { name: "PETR4" })).toBeVisible();
      await expect(page.getByRole("cell", { name: "100" })).toBeVisible();
      await expect(page.getByRole("cell", { name: "Compra" })).toBeVisible();
    });
  });

  test("should properly validate form inputs and handle reset", async ({
    page,
  }) => {
    await test.step("verify initial form state", async () => {
      const addButton = page.getByRole("button", { name: "Adicionar" });
      await expect(addButton).toBeDisabled();
    });

    await test.step("verify form validation", async () => {
      // Fill symbol without selecting from dropdown
      const symbolInput = page.getByPlaceholder("Instrumento");
      await symbolInput.waitFor();
      await symbolInput.fill("PETR4");

      // Verify button remains disabled
      await expect(
        page.getByRole("button", { name: "Adicionar" })
      ).toBeDisabled();

      // Select asset and verify button becomes enabled
      const assetButton = page.getByRole("button", { name: "PETR4" });
      await assetButton.waitFor();
      await assetButton.click();
      await expect(
        page.getByRole("button", { name: "Adicionar" })
      ).toBeEnabled();
    });

    await test.step("verify form reset", async () => {
      // Reset form
      await page.getByRole("button", { name: "Cancelar" }).click();

      // Verify reset state
      const symbolInput = page.getByPlaceholder("Instrumento");
      await expect(symbolInput).toHaveValue("");
      await expect(page.getByPlaceholder("Quantidade")).toHaveValue("1");
      await expect(
        page.getByRole("button", { name: "Adicionar" })
      ).toBeDisabled();
    });
  });
});
