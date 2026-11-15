import { expect, test } from "@playwright/test";

test("home page shows LineTrack", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("LineTrack")).toBeVisible();
});
