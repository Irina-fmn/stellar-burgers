import { test, expect } from '@playwright/test';

test('открывается конструктор', async ({ page }) => {
  await page.routeFromHAR('./tests/hars/ingredients.har', {
    url: '**/ingredients'
  });
  await page.goto('/');
  await expect(page.getByText('Соберите бургер')).toBeVisible();
});
test('добавление ингредиента', async ({ page }) => {
  await page.routeFromHAR('./tests/hars/ingredients.har', {
    url: '**/ingredients'
  });

  await page.goto('/');

  const ingredient = page
    .locator('li')
    .filter({ hasText: 'Краторная булка N-200i' });

  await ingredient.getByRole('button', { name: 'Добавить' }).click();

  await expect(page.getByText('Краторная булка N-200i (верх)'));
  await expect(page.getByText('Краторная булка N-200i (низ)')).toBeVisible();
});
