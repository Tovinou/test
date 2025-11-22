import { test, expect } from '@playwright/test';
import { waitForAppReady } from '../utils/helpers';

test.describe('Tillgänglighet', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/form-demo/');
    await waitForAppReady(page);
  });

  test('ska ha semantiska element och tillgänglig knapp', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Registrera dig/i })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ok nu kör vi' })).toBeEnabled();
    await expect(page.getByPlaceholder('Namn')).toBeEditable();
    await expect(page.getByPlaceholder('Födelseår')).toBeEditable();
    await expect(page.getByPlaceholder('E-post')).toBeEditable();
    await expect(page.getByPlaceholder('Lösenord')).toBeEditable();
  });
});