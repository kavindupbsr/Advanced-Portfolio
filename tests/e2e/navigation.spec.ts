import { test, expect } from "@playwright/test";

test("can navigate to projects page", async ({ page }) => {
  await page.goto("/");

  // Click projects link
  const projectsLink = page.getByRole("link", { name: /projects/i });
  await projectsLink.click();

  // Verify navigation and page content
  await expect(page).toHaveURL("/projects");
  await expect(page.getByRole("heading", { name: /projects/i })).toBeVisible();
});

test("can navigate to blog page", async ({ page }) => {
  await page.goto("/");

  // Click blog link
  const blogLink = page.getByRole("link", { name: /blog/i });
  await blogLink.click();

  // Verify navigation and page content
  await expect(page).toHaveURL("/blog");
  await expect(page.getByRole("heading", { name: /blog/i })).toBeVisible();
});
