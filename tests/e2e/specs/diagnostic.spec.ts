import { test, expect } from '@playwright/test';

test.describe('Diagnostik', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/form-demo/');
    await page.waitForLoadState('networkidle');
  });

  test('ska ladda sidan utan konsolfel', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await expect(page.getByText('Registrera dig')).toBeVisible();
    await expect(page.getByPlaceholder('Namn')).toBeVisible();
    await expect(page.getByPlaceholder('Födelseår')).toBeVisible();
    await expect(page.getByPlaceholder('E-post')).toBeVisible();
    await expect(page.getByPlaceholder('Lösenord')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ok nu kör vi' })).toBeVisible();

    expect(errors.length).toBe(0);
  });
});