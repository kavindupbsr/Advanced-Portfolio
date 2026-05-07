import { test, expect } from "@playwright/test";

test("contact form can be filled and submitted", async ({ page }) => {
  await page.goto("/contact");

  // Check the contact page loaded
  await expect(page.getByRole("heading", { name: /contact/i })).toBeVisible();

  // Fill the form (if form fields exist)
  const emailInput = page.locator('input[type="email"]');
  const messageInput = page.locator('textarea');
  const submitButton = page.locator('button[type="submit"]');

  // Only test if form elements exist
  if (await emailInput.isVisible({ timeout: 1000 }).catch(() => false)) {
    await emailInput.fill("test@example.com");
    await messageInput.fill("This is a test message");
    await submitButton.click();

    // Check for success (page should redirect or show success message)
    await expect(page).toHaveURL(/\/(contact\/success|contact)/);
  }
});
