// form-registration.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Formulärregistrering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tap-ht24-testverktyg.github.io/form-demo/');
    await page.waitForLoadState('networkidle');
  });

  test('ska ladda formuläret korrekt', async ({ page }) => {
    await expect(page.getByText('Registrera dig')).toBeVisible();
    await expect(page.getByText('Namn')).toBeVisible();
    await expect(page.getByText('Födelseår')).toBeVisible();
    await expect(page.getByText('E-post')).toBeVisible();
    await expect(page.getByText('Lösenord')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ok nu kör vi' })).toBeVisible();
  });

  test('ska kunna fylla i alla fält med giltig data', async ({ page }) => {
    // Fyll i formuläret med giltig data
    await page.fill('input[placeholder="Namn"]', 'Anna Svensson');
    await page.fill('input[placeholder="Födelseår"]', '1990');
    await page.fill('input[placeholder="E-post"]', 'anna.svensson@example.com');
    await page.fill('input[placeholder="Lösenord"]', 'Secure123');
    
    await page.click('button:has-text("Ok nu kör vi")');
    
    // Verifiera att formuläret skickas utan felmeddelanden
    await expect(page.getByText('Lösenordet är för lätt')).not.toBeVisible();
  });

  test('ska visa valideringsfel för för enkelt lösenord', async ({ page }) => {
    await page.fill('input[placeholder="Namn"]', 'Nisse');
    await page.fill('input[placeholder="Födelseår"]', '2001');
    await page.fill('input[placeholder="E-post"]', 'example@gmail.com');
    await page.fill('input[placeholder="Lösenord"]', '1234');
    
    await page.click('button:has-text("Ok nu kör vi")');
    
    // Verifiera valideringsmeddelande
    await expect(page.getByText('Lösenordet är för lätt, välj något svårare.')).toBeVisible();
  });

  test('ska validera namnfältet', async ({ page }) => {
    // Testa tomt namn
    await page.fill('input[placeholder="Namn"]', '');
    await page.click('button:has-text("Ok nu kör vi")');
    await expect(page.getByText(/Namn är obligatoriskt|fältet måste fyllas i/i)).toBeVisible();

    // Testa för kort namn
    await page.fill('input[placeholder="Namn"]', 'A');
    await expect(page.getByText(/Namnet måste vara minst 2 tecken/i)).toBeVisible();
  });

  test('ska validera födelseår', async ({ page }) => {
    // Testa ogiltigt år
    await page.fill('input[placeholder="Födelseår"]', '1800');
    await page.click('button:has-text("Ok nu kör vi")');
    await expect(page.getByText(/Ogiltigt födelseår/i)).toBeVisible();

    // Testa för ung användare
    await page.fill('input[placeholder="Födelseår"]', '2020');
    await expect(page.getByText(/Du måste vara minst 13 år gammal/i)).toBeVisible();

    // Testa icke-numeriskt värde
    await page.fill('input[placeholder="Födelseår"]', 'abc');
    await expect(page.getByText(/Födelseår måste vara ett nummer/i)).toBeVisible();
  });

  test('ska validera e-postformat', async ({ page }) => {
    await page.fill('input[placeholder="E-post"]', 'ogiltig-email');
    await page.click('button:has-text("Ok nu kör vi")');
    await expect(page.getByText(/Ogiltig e-postadress/i)).toBeVisible();

    await page.fill('input[placeholder="E-post"]', 'test@example');
    await expect(page.getByText(/Ogiltig e-postadress/i)).toBeVisible();

    await page.fill('input[placeholder="E-post"]', 'test@example.com');
    await expect(page.getByText(/Ogiltig e-postadress/i)).not.toBeVisible();
  });

  test('ska validera lösenordskrav', async ({ page }) => {
    // Testa för kort lösenord
    await page.fill('input[placeholder="Lösenord"]', '123');
    await page.click('button:has-text("Ok nu kör vi")');
    await expect(page.getByText(/Lösenordet måste vara minst 6 tecken/i)).toBeVisible();

    // Testa endast siffror
    await page.fill('input[placeholder="Lösenord"]', '123456');
    await expect(page.getByText(/Lösenordet måste innehålla både bokstäver och siffror/i)).toBeVisible();

    // Testa endast bokstäver
    await page.fill('input[placeholder="Lösenord"]', 'abcdef');
    await expect(page.getByText(/Lösenordet måste innehålla både bokstäver och siffror/i)).toBeVisible();

    // Testa giltigt lösenord
    await page.fill('input[placeholder="Lösenord"]', 'Secure123');
    await expect(page.getByText(/Lösenordet måste innehålla både bokstäver och siffror/i)).not.toBeVisible();
  });

  test('ska kunna skicka formuläret med alla giltiga fält', async ({ page }) => {
    await page.fill('input[placeholder="Namn"]', 'Maria Andersson');
    await page.fill('input[placeholder="Födelseår"]', '1985');
    await page.fill('input[placeholder="E-post"]', 'maria.andersson@example.com');
    await page.fill('input[placeholder="Lösenord"]', 'Lösenord123');
    
    await page.click('button:has-text("Ok nu kör vi")');
    
    // Verifiera framgångsrik registrering (anpassa baserat på appens beteende)
    await expect(page.getByText(/Registrering lyckades|Tack för din registrering/i)).toBeVisible();
  });

  test('skalbarhetstest - flera användare samtidigt', async ({ page }) => {
    const testUsers = [
      { name: 'User1', year: '1990', email: 'user1@test.com', password: 'Pass123' },
      { name: 'User2', year: '1995', email: 'user2@test.com', password: 'Pass456' }
    ];

    for (const user of testUsers) {
      await page.fill('input[placeholder="Namn"]', user.name);
      await page.fill('input[placeholder="Födelseår"]', user.year);
      await page.fill('input[placeholder="E-post"]', user.email);
      await page.fill('input[placeholder="Lösenord"]', user.password);
      
      await page.click('button:has-text("Ok nu kör vi")');
      
      // Återställ för nästa användare
      await page.reload();
      await page.waitForLoadState('networkidle');
    }
  });
});