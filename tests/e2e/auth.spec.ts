import { test, expect } from "@playwright/test";

test.describe("Auth Flow", () => {
    test("Home page loads successfully", async ({ page }) => {
        await page.goto("/");
        await expect(page).toHaveTitle(/VAULT/i);
        await expect(page.locator("body")).toBeVisible();
    });

    test("Login page is accessible", async ({ page }) => {
        await page.goto("/login");
        await expect(page.locator("input[type='email'], input[name='email']").first()).toBeVisible();
        await expect(page.locator("input[type='password']").first()).toBeVisible();
    });

    test("Register page is accessible", async ({ page }) => {
        await page.goto("/register");
        await expect(page.locator("input[type='email'], input[name='email']").first()).toBeVisible();
    });

    test("Forgot password page is accessible", async ({ page }) => {
        await page.goto("/forgot-password");
        await expect(page.locator("input[type='email']").first()).toBeVisible();
    });

    test("Auction listing page loads", async ({ page }) => {
        await page.goto("/auction");
        await expect(page.locator("body")).toBeVisible();
        // Should not show error
        await expect(page.locator("text=Something went wrong")).not.toBeVisible();
    });

    test("404 page shows for invalid route", async ({ page }) => {
        await page.goto("/this-page-absolutely-does-not-exist");
        await expect(page.locator("body")).toContainText("404");
    });

    test("Robots.txt is accessible", async ({ page }) => {
        const response = await page.request.get("/robots.txt");
        expect(response.status()).toBe(200);
    });

    test("Sitemap.xml is accessible", async ({ page }) => {
        const response = await page.request.get("/sitemap.xml");
        expect(response.status()).toBe(200);
    });

    test("Admin routes redirect unauthenticated users", async ({ page }) => {
        await page.goto("/admin");
        // Should be redirected to login
        await expect(page).not.toHaveURL("/admin");
    });
});
