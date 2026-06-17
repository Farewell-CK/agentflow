import { expect, test } from "@playwright/test";

test("home page exposes primary MVP entry points", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /把小商家的数字化需求/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /选择服务包/ })).toBeVisible();
});

test("login page offers demo roles", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("button", { name: /需求方/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Operator/ })).toBeVisible();
});
