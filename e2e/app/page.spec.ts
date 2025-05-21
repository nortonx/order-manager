import { test, expect } from "@playwright/test";

test("Home Page", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page).toHaveTitle("Flowa Order Management");
});

