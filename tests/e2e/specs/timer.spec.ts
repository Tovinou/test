import { test, expect } from '@playwright/test';

test.describe('Prestanda-timer', () => {
  test('ska ladda inom 3 sekunder och validera inom 1 sekund', async ({ page }) => {
    const t0 = Date.now();
    await page.goto('https://tap-ht24-testverktyg.github.io/form-demo/');
    await page.waitForLoadState('networkidle');
    const loadMs = Date.now() - t0;
    expect(loadMs).toBeLessThan(3000);

    await page.fill('input[placeholder="E-post"]', 'ogiltig-email');
    await page.getByRole('button', { name: 'Ok nu kör vi' }).click();
    const v0 = Date.now();
    await expect(page.getByText(/Ogiltig e-postadress/i)).toBeVisible();
    const validateMs = Date.now() - v0;
    expect(validateMs).toBeLessThan(1000);
  });
});